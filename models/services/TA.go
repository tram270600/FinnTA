package services

import (
	"API_Mongo/models/db"
	"API_Mongo/models/entity"
	"API_Mongo/utils"
	"context"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetTA(c *gin.Context) {
	if utils.Database == nil {
		utils.Database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), utils.ConnectTimeout)
	defer cancel()

	// Query T.A
	opt := options.Find()

	var sort_id int
	sort := c.Query("sort") //asc, des
	if sort == "asc" {
		sort_id = 1
	} else {
		if sort == "des" {
			sort_id = -1
		}
	}

	by := c.Query("by") //rate, name
	page, _ := strconv.Atoi(c.Query("page"))

	opt.SetSkip(int64(page) * utils.ElementPerPage)
	opt.SetLimit(utils.ElementPerPage)
	var TA_ls []entity.Out_Account
	var id_ls bson.A
	if by == "name" {
		opt.SetSort(bson.M{"Name": sort_id})
	} else {
		if by == "rate" {
			opt.SetSort(bson.M{"Rate": sort_id})
		}
	}
	filter := bson.M{"Role": "T.A"}
	cursor, err := utils.Database.Collection("Account").Find(ctx, filter, opt)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error()})
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var acc entity.Out_Account
		cursor.Decode(&acc)
		TA_ls = append(TA_ls, acc)
		id_ls = append(id_ls, acc.ID)
	}
	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		return
	}

	// Query class
	classList := make(map[string][]string)

	opt = options.Find()
	opt.SetSkip(int64(page) * utils.ElementPerPage)
	opt.SetLimit(utils.ElementPerPage)
	filter = bson.M{"uid": bson.M{"$all": id_ls}, "available": "true", "deleted_at": utils.Based_date}
	fmt.Println(id_ls)
	cursor, err = utils.Database.Collection("Class").Find(ctx, filter, opt)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error()})
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var class struct {
			UID      primitive.ObjectID `json:"uid,omitempty" bson:"uid,omitempty"`
			CourseID primitive.ObjectID `json:"cid,omitempty" bson:"cid,omitempty"`
		}
		cursor.Decode(&class)
		classList[class.UID.Hex()] = append(classList[class.UID.Hex()], class.CourseID.Hex())
	}
	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"TA": TA_ls, "Class": classList})
}
