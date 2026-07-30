import type { RootState } from "@/app/store";
import type { noteObject, notesState } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: notesState = {
    notes: [],
}

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<noteObject>) => {
            state.notes.push(action.payload);
        },
        editNote: (state, action: PayloadAction<noteObject>) => {
            const updatedNote = action.payload;
            const editedNote = state.notes.find((note: noteObject) => note.id === updatedNote.id);
            if (editedNote) {
                editedNote.title = updatedNote.title;
                editedNote.category = updatedNote.category;
                editedNote.createdAt = updatedNote.createdAt;
                editedNote.description = updatedNote.description;
                editedNote.edited = true;
            }
        },
        deleteAllNotes: (state) => {
            state.notes = [];
        },
        deleteNote: (state, action: PayloadAction<string | undefined>) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload);
        },
    }
})

export const selectNotes = (state: RootState) => state.notes.notes;
export const { addNote, editNote, deleteAllNotes, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;