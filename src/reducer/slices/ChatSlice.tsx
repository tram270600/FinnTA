import { createAction, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { chat, room } from "global/dataType";
import { createRoom, getChat, getRoom } from "reducer/thunks/ChatThunk";

type fectState = {
    status: "loading" | "idle",
    err: string | null,
    // data: { room: room, chatLog: chat[] }[],
    data: { [room_id: string]: { room: room, chatLog: { [chat_id: string]: chat } } }
}

const initialState = {
    status: "idle",
    err: null,
    data: {}
} as fectState

const Chat = createSlice({
    name: "chat",
    initialState: initialState,
    reducers: {
        // updateChat: (state, action: PayloadAction<chat>) => {
        //     for (var i = 0; i < state.data.length; i++) {
        //         if (state.data[i].room._id === action.payload._id) {
        //             state.data[i].chatLog.push(action.payload)
        //             break
        //         }
        //     }
        // }
    },
    extraReducers: (builder) => {
        // Create Room
        builder.addCase(createRoom.pending, (state) => {
            state.status = "loading"
            state.err = null
        })
        builder.addCase(createRoom.fulfilled, (state, { payload }) => {
            state.status = "idle"
            state.data[payload._id] = { room: payload, chatLog: {} }
        })
        builder.addCase(createRoom.rejected, (state, { payload }) => {
            if (payload)
                state.err = payload.msg
            state.status = "idle"
        })

        // Get Room
        builder.addCase(getRoom.pending, (state) => {
            state.status = "loading"
            state.err = null
        })
        builder.addCase(getRoom.fulfilled, (state, { payload }) => {
            state.status = "idle"
            payload.forEach((room) => state.data[room._id] = { room: room, chatLog: {} })
        })
        builder.addCase(getRoom.rejected, (state, { payload }) => {
            if (payload)
                state.err = payload.msg
            state.status = "idle"
        })

        // Get Chat
        builder.addCase(getChat.pending, (state) => {
            state.status = "loading"
            state.err = null
        })
        builder.addCase(getChat.fulfilled, (state, { payload }) => {
            state.status = "idle"
            payload.forEach((chat) => state.data[payload[0].room_id].chatLog[chat._id] = chat)

        })
        builder.addCase(getChat.rejected, (state, { payload }) => {
            if (payload)
                state.err = payload.msg
            state.status = "idle"
        })

        // Receive Msg
        builder.addCase(createAction<{ message: string }>('REDUX_WEBSOCKET::MESSAGE'), (state: Draft<fectState>, action) => {
            let response: chat | undefined
            console.log("Receiving msg")
            try {
                response = JSON.parse(action.payload.message) as chat
            } catch (e) {
                console.error(e);
            }
            console.log("Msg: ", response)
            if (response !== undefined) {
                if (state.data[response.room_id] === undefined)
                    state.data[response.room_id] = { room: {} as room, chatLog: {} }
                state.data[response.room_id].chatLog[response._id] = response
            }
        })
    },
})

// const { actions, reducer } = Chat
const { reducer } = Chat
// export const { updateChat } = actions
export default reducer