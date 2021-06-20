package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Notification = struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UID    primitive.ObjectID `json:"uid,omitempty" bson:"uid,omitempty"`
	Detail string             `json:"detail,omitempty" bson:"detail,omitempty"`
}
