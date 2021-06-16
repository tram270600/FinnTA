import { createSlice } from "@reduxjs/toolkit";
import { classroom } from "global/dataType";
import { CreateClass, GetClass, UpdateClass } from "reducer/thunks/ClassThunk";

type fectState = {
    status: "loading" | "idle",
    err: string | null,
    data: { [id: string]: classroom }
}

const initialState = {
    status: "idle",
    err: null,
    data: {}
} as fectState

const Classroom = createSlice({
    name: "Classroom",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create Classroom
        builder.addCase(CreateClass.pending, (state) => {
            state.status = "loading"
            state.err = null
        })
        builder.addCase(CreateClass.fulfilled, (state, { payload }) => {
            state.status = "idle"
            if (payload._id)
                state.data[payload._id] = payload
        })
        builder.addCase(CreateClass.rejected, (state, { payload }) => {
            if (payload)
                state.err = payload.msg
            state.status = "idle"
        })

        // Get Classrooms
        builder.addCase(GetClass.pending, (state) => {
            state.status = "loading"
            state.err = null
        })
        builder.addCase(GetClass.fulfilled, (state, { payload }) => {
            state.status = "idle"
            payload.forEach((classroom) => {
                if (classroom._id)
                    state.data[classroom._id] = classroom
            })
        })
        builder.addCase(GetClass.rejected, (state, { payload }) => {
            if (payload)
                state.err = payload.msg
            state.status = "idle"
        })

        // Update Classroom
        builder.addCase(UpdateClass.pending, (state) => {
            state.status = "loading"
            state.err = null
        })
        builder.addCase(UpdateClass.fulfilled, (state, { payload }) => {
            state.status = "idle"
        })
        builder.addCase(UpdateClass.rejected, (state, { payload }) => {
            if (payload)
                state.err = payload.msg
            state.status = "idle"
        })
    }
})