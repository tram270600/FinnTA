package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Class struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UID         primitive.ObjectID `json:"uid,omitempty" bson:"uid,omitempty"`
	CourseID    primitive.ObjectID `json:"c_id,omitempty" bson:"c_id,omitempty"`
	Price       float32            `json:"price,omitempty" bson:"price,omitempty"`
	Duration    string             `json:"duration,omitempty" bson:"duration,omitempty"`
	Day         map[string]string  `json:"day,omitempty" bson:"day,omitempty"`
	GPA         float32            `json:"GPA,omitempty" bson:"GPA,omitempty"`
	Description string             `json:"description,omitempty" bson:"description,omitempty"`
	Available   string             `json:"available,omitempty" bson:"available,omitempty"`
	Updated_at  primitive.DateTime `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
	Deleted_at  primitive.DateTime `json:"delete_at,omitempty" bson:"delete_at,omitempty"`
}
