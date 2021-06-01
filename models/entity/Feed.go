package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Feed struct {
	ID         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	From       primitive.ObjectID `json:"uid,omitempty" bson:"uid,omitempty"`
	Detail     string             `json:"detail,omitempty" bson:"detail,omitempty"`
	Updated_at primitive.DateTime `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
	Deleted_at primitive.DateTime `json:"deleted_at" bson:"deleted_at"`
}
