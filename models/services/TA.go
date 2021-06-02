package services

import (
	"API_Mongo/models/db"
	"API_Mongo/models/entity"
	"API_Mongo/utils"
	"context"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetTA(c *gin.Context) {
	if utils.Database == nil {
		utils.Database = db.CreateConnection()
	}
	ctx, cancel := context.WithTimeout(context.Background(), utils.ConnectTimeout)
	defer cancel()

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

	if by == "name" {
		opt.SetSort(bson.M{"Name": sort_id})
	} else {
		if by == "rate" {
			opt.SetSort(bson.M{"Rate": sort_id})
		}
	}

	cursor, err := utils.Database.Collection("Account").Find(ctx, bson.M{}, opt)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": err.Error()})
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var acc entity.Out_Account
		cursor.Decode(&acc)
		TA_ls = append(TA_ls, acc)
	}
	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		return
	}
	c.JSON(http.StatusOK, TA_ls)
}
