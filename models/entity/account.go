package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Account struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Email    string             `json:"Email,omitempty" bson:"Email,omitempty"`
	Password []byte             `json:"-,omitempty" bson:"-,omitempty"`
	Name     string             `json:"Name,omitempty" bson:"Name,omitempty"`
	Avatar   []byte             `json:"Avatar,omitempty" bson:"Avatar,omitempty"`
	Phone    string             `json:"Phone,omitempty" bson:"Phone,omitempty"`
	DoB      primitive.DateTime `json:"DoB,omitempty" bson:"DoB,omitempty"`
	D_id     primitive.ObjectID `json:"d_id,omitempty" bson:"d_id,omitempty"`
	Bio      string             `json:"Bio,omitempty" bson:"Bio,omitempty"`
	Role     string             `json:"Role,omitempty" bson:"Role,omitempty"`
	IsOnline bool               `json:"isOnline,omitemty" bson:"isOnline,omitempty"`
}
