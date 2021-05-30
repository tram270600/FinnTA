package services

import (
	"API_Mongo/models/db"
	"API_Mongo/models/entity"
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateRoom(c *gin.Context) {
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

	_id2, err := primitive.ObjectIDFromHex(data["To"])
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}

	var room entity.Room
	var result entity.Room
	err = database.Collection("Room").
		FindOne(ctx, bson.M{"uid": bson.M{"$all": bson.A{_id, _id2}}}).Decode(&result)
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"msg": "Duplicated room created"})
		return
	}
	room.UID = []primitive.ObjectID{_id, _id2}
	room.ID = primitive.NewObjectID()

	_, err = database.Collection("Room").InsertOne(ctx, room)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"roomID": room.ID})
}

func SendChat(c *gin.Context) {
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

	_room_id, err := primitive.ObjectIDFromHex(data["Room_id"])
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}

	var msg entity.ChatLog
	msg.ID = primitive.NewObjectIDFromTimestamp(time.Now())
	msg.Sender = _id
	msg.Room_id = _room_id
	msg.Msg = data["Msg"]

	_, err = database.Collection("ChatLog").InsertOne(ctx, msg)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}

	fmt.Println(msg.Room_id)
	res, err := database.Collection("Room").
		UpdateOne(ctx, bson.M{"_id": bson.M{"$eq": msg.Room_id}},
			bson.M{"$set": entity.Room{Last_msg: entity.ChatLog{Sender: msg.Sender, Msg: msg.Msg}}})

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"res": res, "ChatID": msg.ID})
}
