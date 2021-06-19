package services

import (
	"github.com/gin-gonic/gin"
)

func CreateSchedule(c *gin.Context) {
	/*
		input: s_id, class_id, startDate
	*/
	// if utils.Database == nil {
	// 	utils.Database = db.CreateConnection()
	// }
	// ctx, cancel := context.WithTimeout(context.Background(), utils.ConnectTimeout)
	// defer cancel()

	// var data map[string]string
	// if err := c.ShouldBindJSON(&data); err != nil {
	// 	c.JSON(http.StatusConflict, gin.H{"msg_input": err.Error()})
	// 	return
	// }

	// _id, err := utils.GetCookie(c)
	// if err != nil {
	// 	fmt.Println(err.Error())
	// 	return
	// }

	// sid, _ := primitive.ObjectIDFromHex(data["s_id"])
	// class_id, _ := primitive.ObjectIDFromHex(data["class_id"])

	// class := entity.Schedule{
	// 	ID:          primitive.NewObjectIDFromTimestamp(time.Now()),
	// 	UID:         _id,
	// 	SID: sid,
	// 	Class_id: class_id,
	// StartDate: ,
	// }

	// _, err := utils.Database.Collection("Class").InsertOne(ctx, class)
	// if err != nil {
	// 	fmt.Println(err.Error())
	// 	c.JSON(http.StatusForbidden, gin.H{"msg": err.Error()})
	// 	return
	// }

	// c.JSON(http.StatusOK, gin.H{"_id": class.ID})
}

func GetSchediule(c *gin.Context) {

}
