package services

import (
	"API_Mongo/models/entity"
	"net/http"

	"github.com/gorilla/websocket"
)

var boardcast = make(chan entity.ChatLog)
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}
