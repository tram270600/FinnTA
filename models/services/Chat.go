package services

import (
	"API_Mongo/models/db"
	"API_Mongo/models/entity"
	"API_Mongo/utils"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateRoom(c *gin.Context) {
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
		return
	}

	_id2, err := primitive.ObjectIDFromHex(data["To"])
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}

	var room entity.Room
	var result entity.Room
	err = utils.Database.Collection("Room").
		FindOne(ctx, bson.M{"uid": bson.M{"$all": bson.A{_id, _id2}}}).Decode(&result)
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"msg": "Duplicated room created"})
		return
	}
	room.UID = []primitive.ObjectID{_id, _id2}
	room.ID = primitive.NewObjectID()

	_, err = utils.Database.Collection("Room").InsertOne(ctx, room)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}

	c.JSON(http.StatusOK, room)
}

func GetRoom(c *gin.Context) {
	if utils.Database == nil {
		utils.Database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), utils.ConnectTimeout)
	defer cancel()

	_id, err := utils.GetCookie(c)
	if err != nil {
		return
	}

	var room_ls []entity.Room
	page, _ := strconv.Atoi(c.Query("page"))

	opt := options.Find()

	opt.SetSkip(int64(page) * utils.ElementPerPage)
	opt.SetLimit(utils.ElementPerPage)
	opt.SetSort(bson.M{"_id": -1}) //Desc

	filter := bson.M{"uid": bson.M{"$all": bson.A{_id}}, "deleted_at": utils.Based_date}

	cursor, err := utils.Database.Collection("Room").Find(ctx, filter, opt)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error()})
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var room entity.Room
		cursor.Decode(&room)
		room_ls = append(room_ls, room)
	}
	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		return
	}
	c.JSON(http.StatusOK, room_ls)
}

func SendChat(c *gin.Context) {
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
		return
	}

	receiver, err := primitive.ObjectIDFromHex(c.Query("to"))
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}

	room_id, err := primitive.ObjectIDFromHex(c.Query("room"))
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}

	var msg entity.ChatLog
	msg.ID = primitive.NewObjectIDFromTimestamp(time.Now())
	msg.Sender = _id
	msg.Receiver = receiver
	msg.Room_id = room_id
	msg.Msg = data["Msg"]
	msg.Updated_at = primitive.NewDateTimeFromTime(time.Now())
	_, err = utils.Database.Collection("ChatLog").InsertOne(ctx, msg)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}

	filter := bson.M{"_id": room_id}

	_, err = utils.Database.Collection("Room").
		UpdateOne(ctx, filter,
			bson.M{"$set": entity.Room{Last_msg: entity.ChatLog{Sender: msg.Sender, Msg: msg.Msg}}})

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"ID": msg.ID})
}

func GetChat(c *gin.Context) {
	if utils.Database == nil {
		utils.Database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), utils.ConnectTimeout)
	defer cancel()

	room := c.Query("room")
	page, _ := strconv.Atoi(c.Query("page"))
	var chatList []entity.ChatLog
	_room_id, _ := primitive.ObjectIDFromHex(room)

	opt := options.Find()

	opt.SetSkip(int64(page) * utils.ElementPerPage)
	opt.SetLimit(utils.ElementPerPage)
	opt.SetSort(bson.M{"_id": -1}) //Desc

	filter := bson.M{"room_id": _room_id, "deleted_at": utils.Based_date}

	cursor, err := utils.Database.Collection("ChastLog").Find(ctx, filter, opt)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error()})
		return
	}

	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var chat entity.ChatLog
		cursor.Decode(&chat)
		chatList = append(chatList, chat)
	}
	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		return
	}
	c.JSON(http.StatusOK, chatList)
}

func handleSendMsg(ws *websocket.Conn) {
	fmt.Println("Got into handle Send Msg")
	defer ws.Close()
	for {
		msg := <-boardcast
		err := ws.WriteJSON(msg)
		fmt.Println(msg.Msg)
		if err != nil {
			fmt.Printf("error: %v", err)
			ws.Close()
		}
	}
}

func TestWatch(c *gin.Context) {
	if utils.Database == nil {
		utils.Database = db.CreateConnection()
	}
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	user, _ := primitive.ObjectIDFromHex(c.Query("id"))
	if user == primitive.NilObjectID {
		return
	}
	matchPipeline := mongo.Pipeline{{{"$match",
		bson.M{
			"fullDocument.receiver": user,
			"operationType":         "insert",
		}}}}

	msg, err := utils.Database.Collection("ChatLog").Watch(ctx, matchPipeline)
	if err != nil {
		panic(err)
	}
	defer msg.Close(ctx)

	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	defer ws.Close()

	go handleSendMsg(ws)

	for msg.Next(ctx) {
		var data bson.M
		if err := msg.Decode(&data); err != nil {
			fmt.Println(err)
			c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
			return
		}
		fmt.Println(data)
		marshal, err := json.Marshal(data["fullDocument"])
		if err != nil {
			c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
			return
		}
		var chat entity.ChatLog
		json.Unmarshal(marshal, &chat)
		boardcast <- chat
	}

	fmt.Println(msg.Err().Error())
}
