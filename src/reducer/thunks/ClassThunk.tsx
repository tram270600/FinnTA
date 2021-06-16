import { createAsyncThunk } from "@reduxjs/toolkit";
import { classroom } from "global/dataType";
import * as Talker from "utils/talker";

type contactError = {
    msg: string,
}

export const CreateClass = createAsyncThunk<classroom, classroom, { rejectValue: contactError }>(
    'class/create',
    async (classroom: classroom, thunkApi) => {
        const res = await Talker.Conn.post<classroom[]>('/class', JSON.stringify(classroom))
        if (res.status !== 200)
            return thunkApi.rejectWithValue({ msg: "Failed to get Class" })
        return classroom
    }
)

export const GetClass = createAsyncThunk<classroom[], { uid: string, page: number }, { rejectValue: contactError }>(
    'class/get',
    async (data, thunkApi) => {
        const res = await Talker.default.TA.getClassroom(data)
        if (res.status !== 200)
            return thunkApi.rejectWithValue({ msg: "Failed to get Class" })
        return res.data
    }
)

export const UpdateClass = createAsyncThunk<void, classroom, { rejectValue: contactError }>(
    'class/update',
    async (classroom: classroom, thunkApi) => {
        const res = await Talker.Conn.put<classroom[]>('/class', JSON.stringify(classroom))
        if (res.status !== 200)
            return thunkApi.rejectWithValue({ msg: "Failed to update Class" })
    }
)