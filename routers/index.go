package routers

import (
	"API_Mongo/middleware"
	"API_Mongo/models/services"

	"github.com/gin-gonic/gin"
)

//InitRoute using Gin
func InitRoute() *gin.Engine {
	router := gin.Default()
	router.Use(middleware.CORSMiddleware())
	router.Static("/public", "./public")

	client := router.Group("/", func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// User
	client.POST("/user/register", services.Register)
	client.POST("/user/login", services.GetAccount)
	client.GET("/user", services.AuthUser)
	client.POST("/user", services.GetUser)
	client.PUT("/user", services.UpdateUser)
	client.GET("/user/logout", services.Logout)

	// Chat
	client.POST("/chat/createRoom", services.CreateRoom)
	client.PUT("/chat", services.SendChat)

	// Department
	client.GET("/department", services.GetAllDepartment)

	// Feed
	client.PUT("/feed", services.CreateFeed)
	client.GET("/feed", services.GetFeed)

	return router
}
