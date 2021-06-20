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

func CreateSchedule(c *gin.Context) {
	/*
		input: s_id, class_id, startDate
	*/
	if utils.Database == nil {
		utils.Database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), utils.ConnectTimeout)
	defer cancel()

	var data struct {
		UID       string `json:"uid,omitempty" bson:"uid,omitempty"`
		SID       string `json:"s_id,omitempty" bson:"s_id,omitempty"`
		Class_id  string `json:"class_id,omitempty" bson:"class_id,omitempty"`
		StartDate string `json:"startDate,omitempty" bson:"startDate,omitempty"`
	}
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_input": err.Error()})
		return
	}

	uid, _ := primitive.ObjectIDFromHex(data.UID)
	sid, _ := primitive.ObjectIDFromHex(data.SID)
	class_id, _ := primitive.ObjectIDFromHex(data.Class_id)

	var schedule = entity.Schedule{
		ID:          primitive.NewObjectIDFromTimestamp(time.Now()),
		UID:         uid,
		SID:         sid,
		Class_id:    class_id,
		IsConfirmed: "false",
		Updated_at:  primitive.NewDateTimeFromTime(time.Now()),
	}

	_, err := utils.Database.Collection("Schedule").InsertOne(ctx, schedule)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusForbidden, gin.H{"msg": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"_id": schedule.ID})
}

func ConfirmSchedule(c *gin.Context) {
	if utils.Database == nil {
		utils.Database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), utils.ConnectTimeout)
	defer cancel()

	_id, _ := primitive.ObjectIDFromHex(c.Query("_id"))

	filter := bson.M{"_id": _id}

	res, err := utils.Database.Collection("Schedule").
		UpdateOne(ctx, filter,
			bson.M{"$set": bson.M{"isConfirmed": "true", "updated_at": primitive.NewDateTimeFromTime(time.Now())}})

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}
	c.JSON(http.StatusOK, res)
}

func GetSchedule(c *gin.Context) {
	/*
		input: uid
		output: []class,
	*/
	if utils.Database == nil {
		utils.Database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), utils.ConnectTimeout)
	defer cancel()

	var filter bson.M
	var s_list = make(map[string]entity.Schedule)
	var c_id bson.A

	if c.Query("uid") != "" {
		uid, _ := primitive.ObjectIDFromHex(c.Query("uid"))
		filter = bson.M{"uid": uid, "isConfirmed": "true"}
	} else {
		if c.Query("s_id") != "" {
			s_id, _ := primitive.ObjectIDFromHex(c.Query("s_id"))
			filter = bson.M{"s_id": s_id, "isConfirmed": "true"}
		}
	}
	cursor, err := utils.Database.Collection("Schedule").Find(ctx, filter)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error()})
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var s entity.Schedule
		cursor.Decode(&s)
		s_list[s.Class_id.Hex()] = s
		c_id = append(c_id, s.Class_id)
	}
	if len(c_id) == 0 {
		c.JSON(http.StatusOK, gin.H{})
		return
	}

	// Query Class
	var classList []entity.Class

	filter = bson.M{"_id": bson.M{"$in": c_id}, "available": "true", "deleted_at": utils.Based_date}
	cursor, err = utils.Database.Collection("Class").Find(ctx, filter)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
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
	c.JSON(http.StatusOK, gin.H{"Schedule": s_list, "Class": classList})
}

func GetStudentCourse(c *gin.Context) {
	/*
		input: s_id, page, available

	*/
	if utils.Database == nil {
		utils.Database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), utils.ConnectTimeout)
	defer cancel()
	var data struct {
		SID       string `json:"s_id,omitempty" bson:"s_id,omitempty"`
		Page      int    `json:"page,omitempty" bson:"page,omitempty"`
		Available bool   `json:"available,omitempty" bson:"available,omitempty"`
	}
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg_input": err.Error()})
		return
	}
	var filter bson.M
	var s_list = make(map[string]entity.Schedule)
	var c_id bson.A
	s_id, _ := primitive.ObjectIDFromHex(data.SID)
	opt := options.Find()
	opt.SetSort(bson.M{"_id": -1})
	opt.SetSkip(int64(data.Page) * utils.ElementPerPage)
	opt.SetLimit(utils.ElementPerPage)

	fmt.Println(s_id)
	filter = bson.M{"s_id": s_id, "isConfirmed": "true"}

	cursor, err := utils.Database.Collection("Schedule").Find(ctx, filter, opt)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error()})
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var s entity.Schedule
		cursor.Decode(&s)
		s_list[s.Class_id.Hex()] = s
		c_id = append(c_id, s.Class_id)
	}

	if len(c_id) == 0 {
		c.JSON(http.StatusOK, gin.H{})
		return
	}

	// Query Class
	var classList []entity.Class
	var id_ls bson.A
	filter = bson.M{"cid": bson.M{"$in": c_id}, "available": strconv.FormatBool(data.Available), "deleted_at": utils.Based_date}
	cursor, err = utils.Database.Collection("Class").Find(ctx, filter, opt)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		fmt.Println(cursor.Current)
		var class entity.Class
		cursor.Decode(&class)
		classList = append(classList, class)
		id_ls = append(id_ls, class.UID)
	}
	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		return
	}
	if len(id_ls) == 0 {
		c.JSON(http.StatusOK, gin.H{})
		return
	}

	// Query T.A
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
	c.JSON(http.StatusOK, gin.H{"Schedule": s_list, "Class": classList, "T.A": TAList})
}
