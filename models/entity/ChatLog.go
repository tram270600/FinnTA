package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type ChatLog struct {
	ID      primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Room_id primitive.ObjectID `json:"room_id,omitempty" bson:"room_id,omitempty"`
	Sender  primitive.ObjectID `json:"sender,omitempty" bson:"sender,omitempty"`
	Msg     string             `json:"msg,omitempty" bson:"msg,omitempty"`
}
