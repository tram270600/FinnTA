import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { department } from "global/dataType";

const Department = createSlice({
    name: 'Department',
    initialState: {} as department,
    reducers: {
        putData: (state, action: PayloadAction<department>) => state = action.payload
    }
})

const { actions, reducer } = Department
export const { putData } = actions
export default reducer