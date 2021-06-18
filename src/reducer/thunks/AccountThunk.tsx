import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { resAccount, loginData, updatableData } from 'global/dataType'
import * as talker from 'utils/talker'

type contactError = {
    msg: string
}
const ErrMsg = new Map([
    [404, "Bad Request"],
    [409, "Wrong username or password"],
    [500, "Server Error! Please report this to the Customer Services. Thank you!"],
])


export const loginThunk = createAsyncThunk<resAccount, loginData, { rejectValue: contactError }>(
    'user/login',
    async (data, thunkApi) => {
        let msg = "Failed to login"
        type response = {
            jwt: string,
            account: resAccount
        }
        try {
            let res = await talker.Conn.post<response>('/user/login', JSON.stringify(data))
            localStorage.setItem("jwt", res.data.jwt)
            return res.data.account
        } catch (err) {
            let error: AxiosError<contactError> = err
            if (!error.response) {
                throw err
            }
            msg = ErrMsg.get(error.response.status)!
            console.log(msg)
            return thunkApi.rejectWithValue({
                msg: msg
            })
        }
    },
)

export const authAccount = createAsyncThunk<resAccount, null, { rejectValue: contactError }>(
    'user/auth',
    async (_, thunkApi) => {
        let msg = "Failed to Auth"
        try {
            let res = await talker.Conn.post<resAccount>('/user', JSON.stringify({
                "jwt": localStorage.getItem("jwt")
            }))
            return res.data
        } catch (err) {
            let error: AxiosError<contactError> = err
            if (!error.response) {
                throw err
            }
            msg = ErrMsg.get(error.response.status)!
            console.log(msg)
            return thunkApi.rejectWithValue({
                msg: msg
            })
        }
    }
)

export const logoutAccount = createAsyncThunk<void, null, { rejectValue: contactError }>(
    'user/logout',
    async (_, thunkApi) => {
        let msg = "Failed to logout"
        try {
            await talker.Conn.get('/user/logout')
            localStorage.clear()
        } catch (err) {
            let error: AxiosError<contactError> = err
            if (!error.response) {
                throw err
            }
            msg = ErrMsg.get(error.response.status)!
            console.log(msg)
            return thunkApi.rejectWithValue({
                msg: msg
            })
        }
    }
)

export const updateAccount = createAsyncThunk<updatableData, updatableData, { rejectValue: contactError }>(
    'user/update',
    async (data, thunkApi) => {
        let msg = "Failed to update"
        try {
            let res = await talker.Conn.put('/user', JSON.stringify(data))
            if (res.status !== 200) {
                msg = ErrMsg.get(res.status)!
                return thunkApi.rejectWithValue({
                    msg: msg
                })
            }
            return data
        } catch (err) {
            let error: AxiosError<contactError> = err
            if (!error.response) {
                throw err
            }
            msg = ErrMsg.get(error.response.status)!
            console.log(msg)
            return thunkApi.rejectWithValue({
                msg: msg
            })
        }
    }
)
