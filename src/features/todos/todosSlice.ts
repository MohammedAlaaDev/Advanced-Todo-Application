import type { RootState } from "@/app/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface todoObject {
    id: string;
    title: string;
    category: (string | undefined)[];
    isCompleted: boolean;
    createdAt: string;
}

interface todoState {
    todos: todoObject[];
}

const initialState: todoState = {
    todos: [
        {
            id: "1",
            title: "test 1",
            category: ["Categorytest 1", "Categorytest 2"],
            isCompleted: false,
            createdAt: new Date().toISOString()
        }
    ],
}

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<todoObject>) => {
            state.todos.push(action.payload);
        }
    }
})

export const { addTodo } = todosSlice.actions
export const selectTodos = (state: RootState) => state.todos.todos;
export default todosSlice.reducer