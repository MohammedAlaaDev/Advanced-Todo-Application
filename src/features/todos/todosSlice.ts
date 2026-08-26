import type { RootState } from "@/app/store";
import type { TodoObject, todoState } from "@/features/todos/types"
import { createEntityAdapter, createSlice, type PayloadAction } from "@reduxjs/toolkit";

const todosAdapter = createEntityAdapter<TodoObject>();
const initialState: todoState = todosAdapter.getInitialState();

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state: todoState, action: PayloadAction<{ data: TodoObject }>) => {
            todosAdapter.addOne(state, action.payload.data);
        },
        toggleTodo: (state: todoState, action: PayloadAction<string>) => {
            const currentTodo = state.entities[action.payload];
            todosAdapter.updateOne(state, {
                id: action.payload,
                changes: { isCompleted: !currentTodo.isCompleted },
            })
        },
        editTodo: (state: todoState, action: PayloadAction<{ data: TodoObject }>) => {

            todosAdapter.updateOne(state, {
                id: action.payload.data.id,
                changes: action.payload.data,
            })
            
        },
        deleteTodo: (state: todoState, action: PayloadAction<string>) => {
            todosAdapter.removeOne(state, action.payload);
        },
        deleteAllTodos: (state: todoState) => {
            todosAdapter.removeAll(state);
        }
    }
})

export const { addTodo, toggleTodo, editTodo, deleteTodo, deleteAllTodos } = todosSlice.actions
export const {
    selectAll: selectTodosArr,
    selectById: selectTodo,
    selectEntities: selectTodosEntities,
    selectIds: selectTodosIds,
    selectTotal: selectTodosCount,
} = todosAdapter.getSelectors((state: RootState) => state.todos);
export default todosSlice.reducer