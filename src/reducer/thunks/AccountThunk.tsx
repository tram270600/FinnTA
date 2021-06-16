import { createAsyncThunk } from '@reduxjs/toolkit'
import { resAccount, loginData, updatableData } from 'global/dataType'
import * as talker from 'utils/talker'

type contactError = {
    msg: string,
}

export const loginThunk = createAsyncThunk<resAccount, loginData, { rejectValue: contactError }>(
    'user/login',
    async (data: loginData, thunkApi) => {
        type response = {
            jwt: string,
            account: resAccount
        }

        let res = await talker.Conn.post<response>('/user/login', JSON.stringify(data))

        if (res.status !== 200) {
            return thunkApi.rejectWithValue({
                msg: "Failed to Login."
            })
        }

        localStorage.setItem("jwt", res.data.jwt)
        return res.data.account
    },
)

export const authAccount = createAsyncThunk<resAccount, null, { rejectValue: contactError }>(
    'user/auth',
    async (_, thunkApi) => {
        let res = await talker.Conn.post<resAccount>('/user', JSON.stringify({
            "jwt": localStorage.getItem("jwt")
        }))
        if (res.status !== 200) {
            return thunkApi.rejectWithValue({
                msg: "Failed to Auth."
            })
        }
        return res.data
    }
)

export const logoutAccount = createAsyncThunk<void, null, { rejectValue: contactError }>(
    'user/logout',
    async (_, thunkApi) => {
        let res = await talker.Conn.get('/user/logout')
        if (res.status !== 200) {
            return thunkApi.rejectWithValue({
                msg: "Failed to Logout."
            })
        }
        localStorage.setItem("jwt", "")
    }
)

export const updateAccount = createAsyncThunk<updatableData, updatableData, { rejectValue: contactError }>(
    'user/update',
    async (data, thunkApi) => {
        let res = await talker.Conn.put('/user', JSON.stringify(data))
        if (res.status !== 200) {
            return thunkApi.rejectWithValue({
                msg: "Failed to Update Account."
            })
        }
        return data
    }
)
