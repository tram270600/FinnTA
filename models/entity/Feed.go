package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Feed struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	From   primitive.ObjectID `json:"f_id,omitempty" bson:"f_id,omitempty"`
	Detail string             `json:"detail,omitempty" bson:"detail,omitempty"`
}
