package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Department = struct {
	ID      primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name    string             `json:"name,omitempty" bson:"name,omitempty"`
	Courses map[string]string  `json:"courses,omitempty" bson:"courses,omitempty"`
}
