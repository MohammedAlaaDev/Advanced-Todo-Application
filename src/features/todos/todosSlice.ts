import type { RootState } from "@/app/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface todoObject {
    id: string;
    title: string | boolean;
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
        addTodo: (state: todoState, action: PayloadAction<todoObject>) => {
            state.todos.push(action.payload);
        },
        toggleTodo: (state: todoState, action: PayloadAction<string>) => {
            const toggledTodo = state.todos.find((todo: todoObject) => todo.id === action.payload);
            if (toggledTodo) toggledTodo.isCompleted = !toggledTodo.isCompleted;
        }
    }
})

export const { addTodo, toggleTodo } = todosSlice.actions
export const selectTodos = (state: RootState) => state.todos.todos;
export default todosSlice.reducer