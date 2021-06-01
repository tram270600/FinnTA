package services

import (
	"API_Mongo/models/db"
	"API_Mongo/models/entity"
	"context"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateFeed(c *gin.Context) {
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
		c.JSON(http.StatusNoContent, gin.H{"msg": err.Error()})
		return
	}

	var feed entity.Feed
	feed.ID = primitive.NewObjectIDFromTimestamp(time.Now())
	feed.From = _id
	feed.Detail = data["Detail"]
	feed.Updated_at = primitive.NewDateTimeFromTime(time.Now())
	_, err = database.Collection("Feed").InsertOne(ctx, feed)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"ID": feed.ID})

}

func GetFeed(c *gin.Context) {
	if database == nil {
		database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), connectTimeout)
	defer cancel()

	page, _ := strconv.Atoi(c.Query("page"))
	var f_list []entity.Feed
	var elementPerPage int64 = 9
	opt := options.Find()
	opt.SetSkip(int64(page) * elementPerPage)
	opt.SetLimit(elementPerPage)
	opt.SetSort(bson.M{"_id": -1}) //Desc

	cursor, err := database.Collection("Feed").Find(ctx, bson.M{}, opt)
	if err != nil {
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
