import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { accountData } from "global/dataType";


const Account = createSlice({
    name: 'Account',
    initialState: {} as accountData,
    reducers: {
        putData: (state, action: PayloadAction<accountData>) => state = action.payload
    }
})

const { actions, reducer } = Account
export const { putData } = actions
export default reducer