import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface todoObject {
    id: string;
    title: string;
    category: string[];
    isCompleted: boolean;
    createdAt: string;
}

interface todoState {
    todos: todoObject[];
}

const initialState: todoState = {
    todos: [],
}

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<todoObject>) => {
            console.log(action.payload);
            state.todos.push(action.payload);
        }
    }
})

export const { addTodo } = todosSlice.actions
export default todosSlice.reducer
