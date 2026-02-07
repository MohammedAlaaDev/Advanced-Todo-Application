import todosReducer from "@/features/todos/todosSlice"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"

const persistConfig = {
    key: "root",
    storage,
}

const rootReducer = combineReducers({
    todos: todosReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (gdm) => gdm({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);