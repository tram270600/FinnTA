package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Feedback = struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	S_ID      primitive.ObjectID `json:"s_id,omitempty" bson:"s_id,omitempty"`
	TA_ID     primitive.ObjectID `json:"TA_id,omitempty" bson:"TA_id,omitempty"`
	Course_ID primitive.ObjectID `json:"c_id,omitempty" bson:"c_id,omitempty"`
	Detail    string             `json:"detail,omitempty" bson:"detail,omitempty"`
	Rate      float32            `json:"rate,omitempty" bson:"rate,omitempty"`
}
