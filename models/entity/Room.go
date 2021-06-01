package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Room struct {
	ID         primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	UID        []primitive.ObjectID `json:"uid,omitempty" bson:"uid,omitempty"`
	Last_msg   ChatLog              `json:"last_msg" bson:"last_msg"`
	Updated_at primitive.DateTime   `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
	Deleted_at primitive.DateTime   `json:"deleted_at" bson:"deleted_at"`
}
