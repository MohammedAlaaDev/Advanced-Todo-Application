import { todosSlice } from "@/features/todos/todosSlice";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        todos: todosSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch