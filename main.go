package main

import (
	"API_Mongo/routers"
	"API_Mongo/utils"
)

func main() {
	router := routers.InitRoute()
	port := utils.EnvVar("localhost", ":27017")
	router.Run(port)
}
