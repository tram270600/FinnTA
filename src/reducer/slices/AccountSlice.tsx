import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "app/store";
import { resAccount } from "global/dataType";
import { authAccount, loginThunk, logoutAccount, updateAccount } from "reducer/thunks/AccountThunk";


type fetchState = {
    status: "loading" | "idle",
    err: string | null,
    data: resAccount
}

const initialState = {
    status: "idle",
    err: null,
    data: {} as resAccount,
} as fetchState

// const selectStatus = (state: RootState) => state.account.status;

const Account = createSlice({
    name: 'Account',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state) => {
            state.status = "loading";
            state.err = null;
        });

        builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.status = "idle";
        });

        builder.addCase(loginThunk.rejected, (state, { payload }) => {
            if (payload)
                state.err = payload.msg;
            state.status = "idle";
        });

        // Update Account
        builder.addCase(updateAccount.pending, (state) => {
            state.status = "loading"
            state.err = null
        })
        builder.addCase(updateAccount.fulfilled, (state, { payload }) => {
            state.status = "idle"
            if (payload.Avatar !== undefined)
                state.data.Avatar = payload.Avatar
            if (payload.Bio !== undefined)
                state.data.Bio = payload.Bio
            if (payload.DoB !== undefined)
                state.data.DoB = payload.DoB
            if (payload.Name !== undefined)
                state.data.Name = payload.Name
        })
        builder.addCase(updateAccount.rejected, (state, { payload }) => {
            if (payload)
                state.err = payload.msg
            state.status = "idle"
        })

        // Auth Account
        builder.addCase(authAccount.pending, (state) => {
            state.status = "loading"
            state.err = null
        })
        builder.addCase(authAccount.fulfilled, (state, { payload }) => {
            state.status = "idle"
            state.data = payload
        })
        builder.addCase(authAccount.rejected, (state, { payload }) => {
            if (payload)
                state.err = payload.msg
            state.status = "idle"
        })

        // Logout Account
        builder.addCase(logoutAccount.pending, (state) => {
            state.status = "loading"
            state.err = null
        })
        builder.addCase(logoutAccount.fulfilled, (state) => {
            state.status = "idle"
            state.data = {} as resAccount
        })
        builder.addCase(logoutAccount.rejected, (state, { payload }) => {
            if (payload)
                state.err = payload.msg
            state.status = "idle"
        })
    },
})

// const { actions, reducer } = Account
const { reducer } = Account
// export const {  } = actions
export default reducer