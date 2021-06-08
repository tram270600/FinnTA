import { createAsyncThunk } from '@reduxjs/toolkit'
import { accountData as resAccount, loginData, updatableData } from 'global/dataType'
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

        let res = await talker.Talker.post<response>('/user/login', JSON.stringify(data))

        if (res.status !== 200) {
            return thunkApi.rejectWithValue({
                msg: "Failed to Login."
            })
        }

        localStorage.setItem("jwt", res.data.jwt)
        return res.data.account
    },
)

export const authAccount = createAsyncThunk<resAccount | string, null, { rejectValue: contactError }>(
    'user/auth',
    async (_, thunkApi) => {
        if (localStorage.getItem("jwt") === "")
            return "Not logged in"
        let res = await talker.Talker.post<resAccount>('/user', JSON.stringify({
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
        let res = await talker.Talker.get('/user/logout')
        if (res.status !== 200) {
            return thunkApi.rejectWithValue({
                msg: "Failed to Logout."
            })
        }
        localStorage.setItem("jwt", "")
    }
)

export const updateAccount = createAsyncThunk<void, updatableData, { rejectValue: contactError }>(
    'user/update',
    async (data, thunkApi) => {
        let res = await talker.Talker.put('/user', JSON.stringify(data))
        if (res.status !== 200) {
            return thunkApi.rejectWithValue({
                msg: "Failed to Update Account."
            })
        }
    }
)


//Use like this
// {
//     const dispact = useDispatch();
//     () => dispact(loginThunk)
// }