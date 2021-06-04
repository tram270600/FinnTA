import { configureStore } from "@reduxjs/toolkit";
import Account from "reducer/AccountSlice";
import Department from "reducer/DepartmentSlice";

const rootReducer = {
    account: Account,
    department: Department,
}

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>

export default store