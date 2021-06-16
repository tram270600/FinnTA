package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Schedule struct {
	ID  primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UID primitive.ObjectID `json:"uid,omitempty" bson:"uid,omitempty"`
	 
}
