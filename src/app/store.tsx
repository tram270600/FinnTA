import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import Account from "reducer/slices/AccountSlice";
import Department from "reducer/slices/DepartmentSlice";
import Chat from "reducer/slices/ChatSlice"
import Feed from "reducer/slices/FeedSlice"
import reduxWebsocket from '@giantmachines/redux-websocket'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const rootReducer = combineReducers({
    Account,
    Department,
    Chat,
    Feed
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(reduxWebsocket())

})
let persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, persistor }