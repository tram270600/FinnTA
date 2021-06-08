import { createAsyncThunk } from '@reduxjs/toolkit'
import { department } from 'global/dataType'
import * as talker from 'utils/talker'

type contactError = {
    msg: string,
}

export const getAllDepartment = createAsyncThunk<department[], void, { rejectValue: contactError }>(
    '/department',
    async (_, thunkApi) => {
        let res = await talker.Talker.get<department[]>('/department')
        if (res.status !== 200)
            return thunkApi.rejectWithValue({
                msg: "Failed to get Department."
            })
        return res.data
    }
)