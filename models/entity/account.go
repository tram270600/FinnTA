package entity

type Account struct {
	ID       string `json:"_id,omitempty" bson:"_id,omitempty"`
	Email    string `json:"Email,omitempty" bson:"Email,omitempty"`
	Password []byte `json:"-,omitempty" bson:"-,omitempty"`
}
