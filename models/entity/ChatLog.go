package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type ChatLog struct {
	ID         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Room_id    primitive.ObjectID `json:"room_id,omitempty" bson:"room_id,omitempty"`
	Sender     primitive.ObjectID `json:"sender,omitempty" bson:"sender,omitempty"`
	Receiver   primitive.ObjectID `json:"receiver,omitempty" bson:"receiver,omitempty"`
	Msg        string             `json:"msg,omitempty" bson:"msg,omitempty"`
	Updated_at primitive.DateTime `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
	Deleted_at primitive.DateTime `json:"deleted_at" bson:"deleted_at"`
}
