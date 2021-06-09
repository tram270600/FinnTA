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

	// User
	router.POST("/user/register", services.Register)
	router.POST("/user/login", services.GetAccount)

	// Test
	router.GET("ws/chat", services.TestWatch)

	client := router.Group("/")
	client.Use(middleware.AuthorizeJWT())

	// User
	client.POST("/user", services.AuthUser)
	client.GET("/user", services.GetUser)
	client.PUT("/user", services.UpdateUser)
	client.GET("/user/logout", services.Logout)

	client.GET("/user/TA", services.GetTA)

	// Chat
	client.POST("/chat/createRoom", services.CreateRoom)
	client.GET("chat/room", services.GetRoom)
	client.PUT("/chat", services.SendChat)
	client.GET("/chat", services.GetChat)

	// Department
	client.GET("/department", services.GetAllDepartment)

	// Feed
	client.PUT("/feed", services.CreateFeed)
	client.GET("/feed", services.GetFeed)

	return router
}
