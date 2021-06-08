import { createAsyncThunk } from '@reduxjs/toolkit'
import { room, chat } from 'global/dataType'
import * as talker from 'utils/talker'

type contactError = {
    msg: string,
}

export const createRoom = createAsyncThunk<room, string, { rejectValue: contactError }>(
    '/chat/createRoom',
    async (id, thunkApi) => {
        let res = await talker.Talker.post<room>('/chat/createRoom', JSON.stringify({ "ID": id }))
        if (res.status !== 200)
            return thunkApi.rejectWithValue({
                msg: "Failed to create Room."
            })
        return res.data
    }
)

export const getRoom = createAsyncThunk<room[], number, { rejectValue: contactError }>(
    '/chat/room',
    async (page, thunkApi) => {
        let res = await talker.Talker.get<room[]>('/chat/room', { params: { page: page } })
        if (res.status !== 200)
            return thunkApi.rejectWithValue({
                msg: "Failed to get Room."
            })
        return res.data
    }
)

export const getChat = createAsyncThunk<chat[], { room_id: string, page: number }, { rejectValue: contactError }>(
    '/chat/get',
    async (data, thunkApi) => {
        let res = await talker.Talker.get<chat[]>('/chat', { params: { page: data.page, room: data.room_id } })
        if (res.status !== 200)
            return thunkApi.rejectWithValue({
                msg: "Failed to get Chat."
            })
        return res.data
    }
)


