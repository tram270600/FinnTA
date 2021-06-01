package utils

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var Based_date primitive.DateTime
var Database *mongo.Database

const ElementPerPage int64 = 9
const ConnectTimeout = 10 * time.Second
const SecretKey = "%f#a^u"
const Ck_exp = 3600 * 24
const Jwt_exp = time.Hour * 24
const Jwt_cost = 12
