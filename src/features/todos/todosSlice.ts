import type { RootState } from "@/app/store";
import type { TodoObject, todoState } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: todoState = {
    todos: [],
}

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state: todoState, action: PayloadAction<{ data: TodoObject }>) => {
            const { data } = action.payload;
            state.todos.push(data);
        },
        toggleTodo: (state: todoState, action: PayloadAction<string>) => {
            const toggledTodo = state.todos.find((todo: TodoObject) => todo.id === action.payload);
            if (toggledTodo) toggledTodo.isCompleted = !toggledTodo.isCompleted;
        },
        editTodo: (state: todoState, action: PayloadAction<{ data: TodoObject }>) => {
            const { data } = action.payload;

            const editedTodo = state.todos.find((todo: TodoObject) => todo.id === data.id);
            if (editedTodo) {
                editedTodo.title = data.title;
                editedTodo.category = data.category;
                editedTodo.editedAt = data.editedAt;
                editedTodo.edited = true;
            }
        },
        deleteTodo: (state: todoState, action: PayloadAction<string>) => {
            const deletedId = action.payload;
            state.todos = state.todos.filter((todo) => todo.id !== deletedId);
        },
        deleteAllTodos: (state: todoState) => {
            state.todos = [];
        }
    }
})

export const { addTodo, toggleTodo, editTodo, deleteTodo, deleteAllTodos } = todosSlice.actions
export const selectTodos = (state: RootState) => state.todos.todos;
export default todosSlice.reducer