package routers

import (
	"API_Mongo/models/services"

	"github.com/gin-gonic/gin"
)

//InitRoute using Gin
func InitRoute() *gin.Engine {
	router := gin.Default()
	router.Static("/public", "./public")

	client := router.Group("/", func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	client.DELETE("/task/delete", services.DeleteTask)
	client.GET("/task/find", services.GetTask)
	client.PUT("/task/update", services.UpdateTask)
	client.GET("/task", services.GetAllTask)
	client.POST("/task", services.CreateTask)

	client.POST("/user/register", services.Register)
	client.GET("/user/login", services.GetAccount)
	client.GET("/user", services.User)
	client.GET("/user/logout", services.Logout)
	return router
}
