package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Schedule struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UID         primitive.ObjectID `json:"uid,omitempty" bson:"uid,omitempty"`
	SID         primitive.ObjectID `json:"s_id,omitempty" bson:"s_id,omitempty"`
	Class_id    primitive.ObjectID `json:"class_id,omitempty" bson:"class_id,omitempty"`
	StartDate   primitive.DateTime `json:"startDate,omitempty" bson:"startDate,omitempty"`
	IsConfirmed string             `json:"isConfirmed,omitempty" bson:"isConfirmed,omitempty"`
	Updated_at  primitive.DateTime `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}
