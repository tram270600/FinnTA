import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chat, room } from "global/dataType";
import { createRoom, getChat, getRoom } from "reducer/thunks/ChatThunk";

type fectState = {
    status: "loading" | "idle",
    err: string | null,
    data: { room: room, chatLog: chat[] }[],
}

const initialState = {
    status: "idle",
    err: null,
    data: []
} as fectState

const Chat = createSlice({
    name: "chat",
    initialState: initialState,
    reducers: {
        updateChat: (state, action: PayloadAction<chat>) => {
            for (var i = 0; i < state.data.length; i++) {
                if (state.data[i].room._id === action.payload._id)
                    state.data[i].chatLog.push(action.payload)
            }
        }
    },
    extraReducers: (builder) => {
        // Create Room
        builder.addCase(createRoom.pending, (state) => {
            state.status = "loading"
            state.err = null
        })
        builder.addCase(createRoom.fulfilled, (state, { payload }) => {
            state.status = "idle"
            state.data.push({ room: payload, chatLog: [] })
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
            payload.forEach((room) => { state.data.push({ room: room, chatLog: [] }) })
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
            for (var i = 0; i < state.data.length; i++) {
                if (state.data[i].room._id === payload[0]._id)
                    state.data[i].chatLog.concat(payload)
            }
        })
        builder.addCase(getChat.rejected, (state, { payload }) => {
            if (payload)
                state.err = payload.msg
            state.status = "idle"
        })
    }
})

const { actions, reducer } = Chat
export const { updateChat } = actions
export default reducer