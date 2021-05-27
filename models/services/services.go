package services

import (
	"API_Mongo/models/db"
	"API_Mongo/models/entity"
	"context"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
	"labix.org/v2/mgo/bson"
)

const connectTimeout = 10 * time.Second
const secretKey = "%f#a^u"

var client *mongo.Client

//POST Create task
func CreateTask(c *gin.Context) {
	var task entity.Task
	if client == nil {
		client = db.GetConnection()
	}

	ctx, cancel := context.WithTimeout(context.Background(), connectTimeout)
	defer cancel()

	if err := c.ShouldBindJSON(&task); err != nil {
		log.Print(err)
		c.JSON(http.StatusBadRequest, gin.H{"msg": err})
	}

	task.ID = primitive.NewObjectID()

	_, err := client.Database("WebDb").Collection("task").InsertOne(ctx, task)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err})
		return
	}
	c.JSON(http.StatusOK, gin.H{"id": task.ID})
}

//GET get task with id
func GetTask(c *gin.Context) {
	if client == nil {
		client = db.GetConnection()
	}

	ctx, cancel := context.WithTimeout(context.Background(), connectTimeout)
	defer cancel()

	var task entity.Task
	id, _ := primitive.ObjectIDFromHex(c.Query("id"))

	err := client.Database("WebDb").Collection("task").FindOne(ctx, entity.Task{ID: id}).Decode(&task)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"Error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"task": &task})
}

//GET get all task
func GetAllTask(c *gin.Context) {
	if client == nil {
		client = db.GetConnection()
	}

	ctx, cancel := context.WithTimeout(context.Background(), connectTimeout)
	defer cancel()

	var taskLs []entity.Task

	result, err := client.Database("WebDb").Collection("task").Find(ctx, bson.M{})

	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"Error": err.Error()})
		return
	}

	for result.Next(ctx) {
		var task entity.Task
		if err = result.Decode(&task); err != nil {
			c.AbortWithStatusJSON(http.StatusConflict, gin.H{"Error": err.Error()})
		}
		taskLs = append(taskLs, task)
	}

	c.JSON(http.StatusOK, gin.H{"task": &taskLs})
}

//UPDATE update task with id
func UpdateTask(c *gin.Context) {
	if client == nil {
		client = db.GetConnection()
	}

	ctx, cancel := context.WithTimeout(context.Background(), connectTimeout)
	defer cancel()

	var task entity.Task
	id, _ := primitive.ObjectIDFromHex(c.Query("id"))

	if err := c.ShouldBindJSON(&task); err != nil {
		c.AbortWithStatusJSON(http.StatusConflict, gin.H{"Error": err.Error()})
		return
	}

	result, err := client.Database("WebDb").Collection("task").UpdateOne(ctx, entity.Task{ID: id}, bson.M{"$set": task})
	if err != nil {
		c.AbortWithStatusJSON(http.StatusConflict, gin.H{"Error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"Result": result})
}

//DELETE delete task
func DeleteTask(c *gin.Context) {
	if client == nil {
		client = db.GetConnection()
	}

	ctx, cancel := context.WithTimeout(context.Background(), connectTimeout)
	defer cancel()

	id, _ := primitive.ObjectIDFromHex(c.Query("id"))

	result, err := client.Database("WebDb").Collection("task").DeleteOne(ctx, entity.Task{ID: id})
	if err != nil {
		c.AbortWithStatusJSON(http.StatusConflict, gin.H{"Error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"Result": result})
}

func GetAccount(c *gin.Context) {
	if client == nil {
		client = db.GetConnection()
	}

	ctx, cancel := context.WithTimeout(context.Background(), connectTimeout)
	defer cancel()

	var data map[string]string
	var account entity.Account
	// id, err := primitive.ObjectIDFromHex(c.Query("id"))
	err := c.ShouldBindJSON(&data)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error()})
		return
	}

	err = client.Database("WebDb").Collection("Account").FindOne(ctx, entity.Account{Email: data["Email"]}).Decode(&account)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"msg": "Wrong email"})
		return
	}

	err = bcrypt.CompareHashAndPassword(account.Password, []byte(data["Password"]))
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": "Wrong password"})
		return
	}

	claim := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    account.ID,
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})

	token, err := claim.SignedString([]byte(secretKey))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		return
	}
	// c.SetCookie("jwt", token, 3600 * 24, "/", "localhost", false, true)
	c.SetCookie("_id", account.ID, 3600*24, "/", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{"jwt": token})
}

func Register(c *gin.Context) {
	if client == nil {
		client = db.GetConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), connectTimeout)
	defer cancel()

	var data map[string]string
	var result entity.Account

	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_input": err.Error()})
		return
	}

	err := client.Database("WebDb").Collection("Account").FindOne(ctx, entity.Account{Email: data["Email"]}).Decode(&result)
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"msg": "Duplicated Email Inputed"})
		return
	}

	password, err := bcrypt.GenerateFromPassword([]byte(data["Password"]), 12)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_bcr": err.Error()})
		return
	}

	account := entity.Account{
		ID:       primitive.NewObjectID().Hex(),
		Email:    data["Email"],
		Password: password,
	}

	_, err = client.Database("WebDb").Collection("Account").InsertOne(ctx, account)
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"msg": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"_id": account.ID})
}

//Get take user information from jwt
func User(c *gin.Context) {
	if client == nil {
		client = db.GetConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), connectTimeout)
	defer cancel()

	//find cookie
	// cookie, err := c.Cookie("jwt")
	// if err != nil {
	// 	c.JSON(http.StatusNonAuthoritativeInfo, gin.H{"msg": err.Error()})
	// 	return
	// }

	//Take parameter
	var data map[string]string
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_input": err.Error()})
		return
	}

	//Take token
	token, err := jwt.ParseWithClaims(data["jwt"], &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})
	if err != nil {
		c.JSON(http.StatusNonAuthoritativeInfo, gin.H{"msg": err.Error()})
		return
	}
	claim := token.Claims.(*jwt.StandardClaims)

	//Find and take account infor
	var account entity.Account
	err = client.Database("WebDb").Collection("Account").FindOne(ctx, entity.Account{ID: claim.Issuer}).Decode(&account)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}

	c.SetCookie("_id", account.ID, 3600*24, "/", "localhost", false, true)

	c.JSON(http.StatusOK, account)
}

//GET clean cookie
func Logout(c *gin.Context) {
	c.SetCookie("jwt", "", -1, "/", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{"msg": "Success"})
}
