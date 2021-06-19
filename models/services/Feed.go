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

func CreateFeed(c *gin.Context) {
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

	var feed entity.Feed
	feed.ID = primitive.NewObjectIDFromTimestamp(time.Now())
	feed.From = _id
	feed.Detail = data["detail"]
	feed.Updated_at = primitive.NewDateTimeFromTime(time.Now())
	_, err = utils.Database.Collection("Feed").InsertOne(ctx, feed)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}
	c.JSON(http.StatusOK, feed)

}

func GetFeed(c *gin.Context) {
	if utils.Database == nil {
		utils.Database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), utils.ConnectTimeout)
	defer cancel()

	page, _ := strconv.Atoi(c.Query("page"))
	var f_list []entity.Feed
	opt := options.Find()
	opt.SetSkip(int64(page) * utils.ElementPerPage)
	opt.SetLimit(utils.ElementPerPage)
	opt.SetSort(bson.M{"_id": -1}) //Desc

	cursor, err := utils.Database.Collection("Feed").Find(ctx, bson.M{}, opt)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error()})
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var f entity.Feed
		cursor.Decode(&f)
		f_list = append(f_list, f)
	}
	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		return
	}
	c.JSON(http.StatusOK, f_list)
}
