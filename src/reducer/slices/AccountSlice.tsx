import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { accountData, loginData, resAccount, updatableData } from "global/dataType";
import { loginThunk } from "reducer/thunks/AccountThunk";


type fetchState = {
    status: "loading" | "idle",
    err: string | null,
    account: resAccount
}

const initialState = {
    status: "idle",
    err: null,
    account: {} as resAccount,
} as fetchState

const selectStatus = (state: RootState) => state.account.status;

const Account = createSlice({
    name: 'Account',
    initialState: initialState,
    reducers: {
        // putData: (state, action: PayloadAction<accountData>) => state = action.payload
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state) => {
            state.status = "loading";
            state.err = null;
        });

        builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
            // state.account = payload;
            state.status = "idle";
        });

        builder.addCase(loginThunk.rejected, (state, { payload }) => {
            if (payload)
                state.err = payload.msg;
            state.status = "idle";
        });
    },
})

const { actions, reducer } = Account
// export const {  } = actions
export default reducer