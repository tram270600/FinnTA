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

func CreateFeedback(c *gin.Context) {
	/*
		input: class_id, rate, detail
	*/
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

	_id, err := utils.GetCookie(c)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	class_id, _ := primitive.ObjectIDFromHex(data["class_id"])
	rate, _ := strconv.ParseFloat(data["Rate"], 32)

	var feedback entity.Feedback
	feedback.ID = primitive.NewObjectIDFromTimestamp(time.Now())
	feedback.S_ID = _id
	feedback.Class_ID = class_id
	feedback.Rate = float32(rate)
	feedback.Detail = data["detail"]
	feedback.Updated_at = primitive.NewDateTimeFromTime(time.Now())
	feedback.Deleted_at = utils.Based_date

	_, err = utils.Database.Collection("Feedback").InsertOne(ctx, feedback)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}
	c.JSON(http.StatusOK, feedback)
}

func GetFeedback(c *gin.Context) {
	/*
		Input: page, sort, by, id
		Return: id, avatar, name, detail, rate
	*/
	type userStruct = struct {
		ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
		Name   string             `json:"Name,omitempty" bson:"Name,omitempty"`
		Avatar []byte             `json:"Avatar,omitempty" bson:"Avatar,omitempty"`
	}
	type feedback = struct {
		ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
		Detail string             `json:"detail,omitempty" bson:"detail,omitempty"`
		Rate   float32            `json:"Rate,omitempty" bson:"Rate,omitempty"`
		S_ID   primitive.ObjectID `json:"s_id,omitempty" bson:"s_id,omitempty"`
	}

	var f_list []feedback
	var idLs bson.A

	if utils.Database == nil {
		utils.Database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), utils.ConnectTimeout)
	defer cancel()

	page, _ := strconv.Atoi(c.Query("page"))
	var sort_id int
	sort := c.Query("sort") //asc, des
	if sort == "asc" {
		sort_id = 1
	} else {
		sort_id = -1
	}
	id, _ := primitive.ObjectIDFromHex(c.Query("id"))
	by := c.Query("by") //time, rate

	opt := options.Find()
	opt.SetSkip(int64(page) * utils.ElementPerPage)
	opt.SetLimit(utils.ElementPerPage)

	if by == "time" {
		opt.SetSort(bson.M{"_id": sort_id})
	} else {
		if by == "rate" {
			opt.SetSort(bson.M{"Rate": sort_id})
		}
	}
	var filter = bson.M{}
	if id != primitive.NilObjectID {
		filter = bson.M{"class_id": id}
	}

	cursor, err := utils.Database.Collection("Feedback").Find(ctx, filter, opt)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var f feedback
		cursor.Decode(&f)
		f_list = append(f_list, f)
		idLs = append(idLs, f.S_ID)
	}
	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		return
	}
	if len(idLs) == 0 {
		c.JSON(http.StatusOK, gin.H{})
		return
	}

	// Query user
	var u_list = make(map[string]userStruct)
	filter = bson.M{"_id": bson.M{"$all": idLs}}

	opt = options.Find()
	opt.SetSkip(int64(page) * utils.ElementPerPage)
	opt.SetLimit(utils.ElementPerPage)
	cursor, err = utils.Database.Collection("Account").Find(ctx, filter, opt)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var user userStruct
		cursor.Decode(&user)
		u_list[user.ID.Hex()] = user
	}
	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"Feedback": f_list, "User": u_list})
}
