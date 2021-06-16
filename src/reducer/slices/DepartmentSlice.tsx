import { createSlice } from "@reduxjs/toolkit";
import { department } from "global/dataType";
import { getAllDepartment } from '../thunks/DepartmentThunk'

type fetchState = {
    status: "loading" | "idle",
    err: string | null,
    data: { [d_id: string]: department },
}

const initialState = {
    status: "idle",
    err: null,
    data: {},
} as fetchState

const Department = createSlice({
    name: 'Department',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllDepartment.pending, (state) => {
            state.status = "loading"
            state.err = null
        })
        builder.addCase(getAllDepartment.fulfilled, (state, { payload }) => {
            state.status = "idle"
            payload.forEach((department) => {
                if (department._id)
                    state.data[department._id] = department
            })
        })
        builder.addCase(getAllDepartment.rejected, (state, { payload }) => {
            if (payload)
                state.err = payload.msg
            state.status = "idle"
        })
    }
})

const { reducer } = Department
export default reducer