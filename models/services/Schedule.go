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
	"go.mongodb.org/mongo-driver/bson/primitive"
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
		UID         string `json:"uid,omitempty" bson:"uid,omitempty"`
		SID         string `json:"s_id,omitempty" bson:"s_id,omitempty"`
		Class_id    string `json:"class_id,omitempty" bson:"class_id,omitempty"`
		StartDate   string `json:"startDate,omitempty" bson:"startDate,omitempty"`
		IsConfirmed bool   `json:"isConfirmed,omitempty" bson:"isConfirmed,omitempty"`
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
		IsConfirmed: strconv.FormatBool(data.IsConfirmed),
	}

	_, err := utils.Database.Collection("Schedule").InsertOne(ctx, schedule)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusForbidden, gin.H{"msg": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"_id": schedule.ID})
}

func GetSchediule(c *gin.Context) {

}
