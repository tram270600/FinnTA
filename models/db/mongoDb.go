package db

import (
	"context"
	"fmt"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

const (
	connectTimeout     = 10 * time.Second
	connectURITemplate = "mongodb+srv://%s:%s@%s/%s?retryWrites=true&w=majority"
)

func CreateConnection() *mongo.Database {
	username := os.Getenv("USER")
	password := os.Getenv("PASSWORD")
	connectString := os.Getenv("DB_CONNECTION_STRING")
	cluster := os.Getenv("CLUSTER")

	connectURI := fmt.Sprintf(connectURITemplate, username, password, connectString, cluster)

	ctx, cancel := context.WithTimeout(context.Background(), connectTimeout)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(connectURI))
	if err != nil {
		fmt.Println(err.Error())
		panic(err)
	}

	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		panic(err)
	}

	return client.Database("WebDb")
}
