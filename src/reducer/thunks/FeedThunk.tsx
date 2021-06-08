import { createAsyncThunk } from '@reduxjs/toolkit'
import { feed } from 'global/dataType'
import * as talker from 'utils/talker'

type contactError = {
    msg: string,
}

export const createFeed = createAsyncThunk<feed, string, { rejectValue: contactError }>(
    'feed/create',
    async (detail, thunkApi) => {
        let res = await talker.Talker.put<feed>('/feed', JSON.stringify({ Detail: detail }))
        if (res.status !== 200)
            return thunkApi.rejectWithValue({
                msg: "Failed to create Feed."
            })
        return res.data
    }
)

export const getFeed = createAsyncThunk<feed[], number, { rejectValue: contactError }>(
    'feed/get',
    async (page, thunkApi) => {
        let res = await talker.Talker.get<feed[]>('/feed', { params: { page: page } })
        if (res.status !== 200)
            return thunkApi.rejectWithValue({
                msg: "Failed to get Feed."
            })
        return res.data
    }
)