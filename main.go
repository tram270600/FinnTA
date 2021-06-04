package main

import (
	"API_Mongo/routers"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load(".env")
	port := os.Getenv("PORT")

	if port == "" {
		port = "27017"
	}
	router := routers.InitRoute()
	// port := utils.EnvVar("localhost", ":27017")
	router.Run(":" + port)
}
