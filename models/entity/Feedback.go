package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Feedback = struct {
	ID         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	S_ID       primitive.ObjectID `json:"s_id,omitempty" bson:"s_id,omitempty"`
	Class_ID   primitive.ObjectID `json:"class_id,omitempty" bson:"class_id,omitempty"`
	Detail     string             `json:"detail,omitempty" bson:"detail,omitempty"`
	Rate       float32            `json:"Rate,omitempty" bson:"Rate,omitempty"`
	Updated_at primitive.DateTime `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
	Deleted_at primitive.DateTime `json:"deleted_at" bson:"deleted_at"`
}
