package utils

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func EnvVar(key string, defaulVal string) string {
	godotenv.Load(".env")
	value := os.Getenv(key)
	if len(value) == 0 {
		return defaulVal
	}
	log.Fatal("Loaded")
	return value
}

func GetCookie(c *gin.Context) (primitive.ObjectID, error) {
	cookie, err := c.Cookie("_id")
	if err != nil {
		c.JSON(http.StatusNonAuthoritativeInfo, gin.H{"msg": err.Error()})
		return primitive.NilObjectID, err
	}

	_id, err := primitive.ObjectIDFromHex(cookie)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"msg": err.Error()})
		return primitive.NilObjectID, err
	}
	return _id, nil
}
