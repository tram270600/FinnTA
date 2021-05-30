package services

import (
	"API_Mongo/models/db"
	"API_Mongo/models/entity"
	"API_Mongo/utils"
	"context"
	"net/http"
	"strconv"
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

var database *mongo.Database

func GetAccount(c *gin.Context) {
	if database == nil {
		database = db.CreateConnection()
	}

	ctx, cancel := context.WithTimeout(context.Background(), connectTimeout)
	defer cancel()

	var data map[string]string
	var account entity.Account

	err := c.ShouldBindJSON(&data)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error()})
		return
	}

	err = database.Collection("Account").FindOne(ctx, entity.Account{Email: data["Email"]}).Decode(&account)
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
		Issuer:    account.ID.Hex(),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})

	token, err := claim.SignedString([]byte(secretKey))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		return
	}
	// c.SetCookie("jwt", token, 3600 * 24, "/", "localhost", false, true)
	c.SetCookie("_id", account.ID.Hex(), 3600*24, "/", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{"jwt": token})

}

func Register(c *gin.Context) {
	if database == nil {
		database = db.CreateConnection()
	}

	ctx, cancel := context.WithTimeout(context.Background(), connectTimeout)
	defer cancel()

	var data map[string]string
	var result entity.Account

	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_input": err.Error()})
		return
	}

	err := database.Collection("Account").FindOne(ctx, entity.Account{Email: data["Email"]}).Decode(&result)
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"msg": "Duplicated Email Inputed"})
		return
	}

	password, err := bcrypt.GenerateFromPassword([]byte(data["Password"]), 12)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_bcr": err.Error()})
		return
	}

	dob, err := utils.ParseDate(data["DoB"])
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_bcr": err.Error()})
		return
	}

	d_id, err := primitive.ObjectIDFromHex(data["D_id"])
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_bcr": err.Error()})
		return
	}

	isOnline, err := strconv.ParseBool(data["isOnline"])
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_bcr": err.Error()})
		return
	}

	account := entity.Account{
		ID:       primitive.NewObjectID(),
		Email:    data["Email"],
		Password: password,
		Name:     data["Name"],
		Avatar:   []byte(data["Avatar"]),
		Phone:    data["Phone"],
		DoB:      primitive.NewDateTimeFromTime(dob),
		D_id:     d_id,
		Bio:      data["Bio"],
		Role:     data["Role"],
		IsOnline: isOnline,
	}

	_, err = database.Collection("Account").InsertOne(ctx, account)
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"msg": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"_id": account.ID})

}

//Get take user information from jwt
func AuthUser(c *gin.Context) {
	if database == nil {
		database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), connectTimeout)
	defer cancel()

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
	id, err := primitive.ObjectIDFromHex(claim.Issuer)
	if err != nil {
		panic(err)
	}
	err = database.Collection("Account").FindOne(ctx, entity.Account{ID: id}).Decode(&account)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}

	c.SetCookie("_id", account.ID.Hex(), 3600*24, "/", "localhost", false, true)

	c.JSON(http.StatusOK, account)

}

func GetUser(c *gin.Context) {
	if database == nil {
		database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), connectTimeout)
	defer cancel()

	var data map[string]string
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_input": err.Error()})
		return
	}

	_id, err := primitive.ObjectIDFromHex(data["ID"])
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}

	var acc entity.Account
	err = database.Collection("Account").FindOne(ctx, entity.Account{ID: _id}).Decode(&acc)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"msg": "Not Found ID"})
		return
	}
	c.JSON(http.StatusOK, acc)
}

func UpdateUser(c *gin.Context) {
	if database == nil {
		database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), connectTimeout)
	defer cancel()

	var data map[string]string
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_input": err.Error()})
		return
	}

	// find cookie
	cookie, err := c.Cookie("_id")
	if err != nil {
		c.JSON(http.StatusNonAuthoritativeInfo, gin.H{"msg": err.Error()})
		return
	}

	_id, err := primitive.ObjectIDFromHex(cookie)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}

	tempAcc := entity.Account{
		Name:  data["Name"],
		Phone: data["Phone"],
		Bio:   data["Bio"],
		Role:  data["Role"],
	}

	if data["Password"] != "" {
		password, err := bcrypt.GenerateFromPassword([]byte(data["Password"]), 12)
		if err != nil {
			c.JSON(http.StatusConflict, gin.H{"msg_bcr": err.Error()})
			return
		}
		tempAcc.Password = password
	}

	if data["Name"] != "" {
		tempAcc.Name = data["Name"]
	}

	if data["Avatar"] != "" {
		tempAcc.Avatar = []byte(data["Avatar"])
	}

	if data["Phone"] != "" {
		tempAcc.Phone = data["Phone"]
	}

	if data["Bio"] != "" {
		tempAcc.Bio = data["Bio"]
	}

	if data["isOnline"] != "" {
		isOnline, err := strconv.ParseBool(data["isOnline"])
		if err != nil {
			c.JSON(http.StatusConflict, gin.H{"msg_bcr": err.Error()})
			return
		}
		tempAcc.IsOnline = isOnline
	}

	if data["DoB"] != "" {
		dob, err := utils.ParseDate(data["DoB"])
		if err != nil {
			c.JSON(http.StatusConflict, gin.H{"msg_bcr": err.Error()})
			return
		}
		tempAcc.DoB = primitive.NewDateTimeFromTime(dob)
	}

	result, err := database.Collection("Account").UpdateOne(ctx, entity.Account{ID: _id}, bson.M{"$set": tempAcc})
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_bcr": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"msg": result})
}

//GET clean cookie
func Logout(c *gin.Context) {
	c.SetCookie("_id", "", -1, "/", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{"msg": "Success"})
}
