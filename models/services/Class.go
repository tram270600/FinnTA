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
		CourseID    string          `json:"cid,omitempty" bson:"cid,omitempty"`
		Price       string          `json:"price,omitempty" bson:"price,omitempty"`
		Duration    string          `json:"duration,omitempty" bson:"duration,omitempty"`
		Day         map[string]bool `json:"day,omitempty" bson:"day,omitempty"`
		GPA         string          `json:"GPA,omitempty" bson:"GPA,omitempty"`
		Description string          `json:"description,omitempty" bson:"description,omitempty"`
		Available   string          `json:"available,omitempty" bson:"available,omitempty"`
	}
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_input": err.Error()})
		return
	}
	var day = make(map[string]string)
	uid, _ := utils.GetCookie(c)
	cid, _ := primitive.ObjectIDFromHex(data.CourseID)
	price, _ := strconv.ParseFloat(data.Price, 32)
	gpa, _ := strconv.ParseFloat(data.GPA, 32)
	for s, i := range data.Day {
		day[s] = strconv.FormatBool(i)
	}
	class := entity.Class{
		ID:          primitive.NewObjectIDFromTimestamp(time.Now()),
		UID:         uid,
		CourseID:    cid,
		Price:       float32(price),
		Duration:    data.Duration,
		GPA:         float32(gpa),
		Day:         day,
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
		input: page, uid
		output: class[]
	*/
	if utils.Database == nil {
		utils.Database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), utils.ConnectTimeout)
	defer cancel()

	var classList []entity.Class
	var filter bson.M

	var data struct {
		Uid       string   `json:"uid,omitempty" bson:"uid,omitempty"`
		Page      int      `json:"page,omitempty" bson:"page,omitempty"`
		Keyword   []string `json:"keyword,omitempty" bson:"keyword,omitempty"`
		Available bool     `json:"available,omitempty" bson:"available,omitempty"`
	}
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_input": err.Error()})
		return
	}
	var id_ls bson.A
	available := strconv.FormatBool(data.Available)

	if data.Uid != "" {
		uid, _ := primitive.ObjectIDFromHex(data.Uid)
		filter = bson.M{"uid": uid, "available": available, "deleted_at": utils.Based_date}
	} else {
		var idLs bson.A
		for _, s := range data.Keyword {
			id, _ := primitive.ObjectIDFromHex(s)
			idLs = append(idLs, id)
		}
		fmt.Println(idLs)
		filter = bson.M{"cid": bson.M{"$in": idLs}, "available": available, "deleted_at": utils.Based_date}
	}
	fmt.Println(filter)
	opt := options.Find()
	opt.SetSort(bson.M{"_id": -1})
	opt.SetSkip(int64(data.Page) * utils.ElementPerPage)
	opt.SetLimit(utils.ElementPerPage)

	cursor, err := utils.Database.Collection("Class").Find(ctx, filter, opt)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error()})
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		fmt.Println(cursor.Current)
		var class entity.Class
		cursor.Decode(&class)
		id_ls = append(id_ls, class.UID)
		classList = append(classList, class)
	}
	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		return
	}

	if len(id_ls) == 0 {
		c.JSON(http.StatusOK, gin.H{})
		return
	}

	// Get T.A
	TAList := make(map[string]entity.Out_Account)
	filter = bson.M{"_id": bson.M{"$in": id_ls}, "Role": "T.A"}
	cursor, err = utils.Database.Collection("Account").Find(ctx, filter, opt)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error()})
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var acc entity.Out_Account
		cursor.Decode(&acc)
		TAList[acc.ID.Hex()] = acc
	}
	c.JSON(http.StatusOK, gin.H{"Class": classList, "T.A": TAList})
}

func UpdateClass(c *gin.Context) {
	if utils.Database == nil {
		utils.Database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), utils.ConnectTimeout)
	defer cancel()

	var data struct {
		UID         string          `json:"_id,omitempty" bson:"_id,omitempty"`
		Price       string          `json:"price,omitempty" bson:"price,omitempty"`
		Day         map[string]bool `json:"day,omitempty" bson:"day,omitempty"`
		Description string          `json:"description,omitempty" bson:"description,omitempty"`
		Available   string          `json:"available,omitempty" bson:"available,omitempty"`
	}
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_input": err.Error()})
		return
	}

	tempClass := entity.Class{
		Updated_at: primitive.NewDateTimeFromTime(time.Now()),
	}

	_id, _ := primitive.ObjectIDFromHex(data.UID)

	if data.Price != "" {
		price, _ := strconv.ParseFloat(data.Price, 32)
		tempClass.Price = float32(price)
	}

	if data.Description != "" {
		tempClass.Description = data.Description
	}
	if data.Available != "" {
		tempClass.Available = data.Available
	}
	if data.Day != nil {
		var day = make(map[string]string)
		for s, i := range data.Day {
			day[s] = strconv.FormatBool(i)
		}
		tempClass.Day = day
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
