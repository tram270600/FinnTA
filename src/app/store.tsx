import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import Account from "reducer/slices/AccountSlice";
import Department from "reducer/slices/DepartmentSlice";
import Chat from "reducer/slices/ChatSlice"
import Feed from "reducer/slices/FeedSlice"

const rootReducer = {
    account: Account,
    department: Department,
    chat: Chat,
    feed: Feed,
}

const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store