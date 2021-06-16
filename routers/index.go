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

	//Global
	// User
	router.POST("/user/register", services.Register)
	router.POST("/user/login", services.GetAccount)

	// TA
	router.GET("/user/TA", services.GetTA)

	// Department
	router.GET("/department", services.GetAllDepartment)
	router.PUT("/department", services.InsertDepartment)

	// Class
	router.GET("/class", services.GetClass)

	// Chat
	router.GET("ws/chat", services.TestWatch)

	//USER
	client := router.Group("/")
	client.Use(middleware.AuthorizeJWT())

	// User
	client.POST("/user", services.AuthUser)
	client.GET("/user", services.GetUser)
	client.PUT("/user", services.UpdateUser)
	client.GET("/user/logout", services.Logout)

	// Chat
	client.POST("/chat/createRoom", services.CreateRoom)
	client.GET("chat/room", services.GetRoom)
	client.PUT("/chat", services.SendChat)
	client.GET("/chat", services.GetChat)

	// Feed
	client.PUT("/feed", services.CreateFeed)
	client.GET("/feed", services.GetFeed)

	// Class
	client.PUT("/class", services.CreateClass)
	client.POST("/class", services.UpdateClass)

	return router
}
