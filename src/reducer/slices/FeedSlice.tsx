import { createSlice } from "@reduxjs/toolkit";
import { feed } from "global/dataType";
import { createFeed, getFeed } from "reducer/thunks/FeedThunk";

type fetchState = {
    status: "loading" | "idle",
    err: string | null,
    feed: feed[],
}

const initialState = {
    status: "idle",
    err: null,
    feed: [],
} as fetchState

const Feed = createSlice({
    name: "Feed",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createFeed.pending, (state) => {
            state.status = "loading"
            state.err = null
        })
        builder.addCase(createFeed.fulfilled, (state, { payload }) => {
            state.status = "idle"
            state.feed.push(payload)
        })
        builder.addCase(createFeed.rejected, (state, { payload }) => {
            if (payload)
                state.err = payload.msg
            state.status = "idle"
        })

        builder.addCase(getFeed.pending, (state) => {
            state.status = "loading"
            state.err = null
        })
        builder.addCase(getFeed.fulfilled, (state, { payload }) => {
            state.status = "idle"
            state.feed = payload
        })
        builder.addCase(getFeed.rejected, (state, { payload }) => {
            if (payload)
                state.err = payload.msg
            state.status = "idle"
        })
    }
})

const { reducer } = Feed
export default reducer