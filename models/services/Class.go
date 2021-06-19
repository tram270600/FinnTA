package services

import (
	"API_Mongo/models/db"
	"API_Mongo/models/entity"
	"API_Mongo/utils"
	"context"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateClass(c *gin.Context) {
	if utils.Database == nil {
		utils.Database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), utils.ConnectTimeout)
	defer cancel()

	var data struct {
		CourseID    string            `json:"cid,omitempty" bson:"cid,omitempty"`
		Price       string            `json:"price,omitempty" bson:"price,omitempty"`
		Duration    string            `json:"duration,omitempty" bson:"duration,omitempty"`
		Day         map[string]string `json:"day,omitempty" bson:"day,omitempty"`
		GPA         string            `json:"GPA,omitempty" bson:"GPA,omitempty"`
		Description string            `json:"description,omitempty" bson:"description,omitempty"`
		Available   string            `json:"available,omitempty" bson:"available,omitempty"`
	}
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_input": err.Error()})
		return
	}

	uid, _ := utils.GetCookie(c)
	cid, _ := primitive.ObjectIDFromHex(data.CourseID)
	price, _ := strconv.ParseFloat(data.Price, 32)
	gpa, _ := strconv.ParseFloat(data.GPA, 32)

	class := entity.Class{
		ID:          primitive.NewObjectIDFromTimestamp(time.Now()),
		UID:         uid,
		CourseID:    cid,
		Price:       float32(price),
		Duration:    data.Duration,
		GPA:         float32(gpa),
		Day:         data.Day,
		Description: data.Description,
		Available:   data.Available,
		Updated_at:  primitive.NewDateTimeFromTime(time.Now()),
		Deleted_at:  utils.Based_date,
	}

	_, err := utils.Database.Collection("Class").InsertOne(ctx, class)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusForbidden, gin.H{"msg": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"_id": class.ID})
}

func GetClass(c *gin.Context) {
	/*
		input: page, uid, by
		output: class[]
	*/
	if utils.Database == nil {
		utils.Database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), utils.ConnectTimeout)
	defer cancel()

	var classList []entity.Class
	page, _ := strconv.Atoi(c.Query("page"))
	// by := c.Query("by") // uid,
	uid, _ := primitive.ObjectIDFromHex(c.Query("uid"))

	opt := options.Find()
	opt.SetSort(bson.M{"_id": -1})
	opt.SetSkip(int64(page) * utils.ElementPerPage)
	opt.SetLimit(utils.ElementPerPage)
	filter := bson.M{"uid": uid, "available": "true", "deleted_at": utils.Based_date}

	cursor, err := utils.Database.Collection("Class").Find(ctx, filter, opt)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error()})
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var class entity.Class
		cursor.Decode(&class)
		classList = append(classList, class)
	}
	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		return
	}

	c.JSON(http.StatusOK, classList)
}

func UpdateClass(c *gin.Context) {
	if utils.Database == nil {
		utils.Database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), utils.ConnectTimeout)
	defer cancel()

	var data map[string]string
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_input": err.Error()})
		return
	}

	tempClass := entity.Class{
		Updated_at: primitive.NewDateTimeFromTime(time.Now()),
	}

	_id, _ := primitive.ObjectIDFromHex(data["_id"])

	if data["courseID"] != "" {
		cid, _ := primitive.ObjectIDFromHex(data["courseID"])
		tempClass.CourseID = cid
	}
	if data["price"] != "" {
		price, _ := strconv.ParseFloat(data["price"], 32)
		tempClass.Price = float32(price)
	}
	if data["duration"] != "" {
		tempClass.Duration = data["duration"]
	}
	if data["GPA"] != "" {
		gpa, _ := strconv.ParseFloat(data["GPA"], 32)
		tempClass.GPA = float32(gpa)
	}
	if data["description"] != "" {
		tempClass.Description = data["description"]
	}
	if data["available"] != "" {
		tempClass.Available = data["available"]
	}

	result, err := utils.Database.Collection("Class").
		UpdateOne(ctx, entity.Class{ID: _id}, bson.M{"$set": tempClass})
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusConflict, gin.H{"msg_bcr": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"msg": result})

}
