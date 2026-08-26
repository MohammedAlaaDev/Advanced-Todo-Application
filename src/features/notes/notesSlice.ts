import type { RootState } from "@/app/store";
import type { NoteObject, NotesState } from '@/features/notes/types'
import { createEntityAdapter, createSlice, type PayloadAction } from "@reduxjs/toolkit";


const notesAdapter = createEntityAdapter<NoteObject>();

const initialState: NotesState = notesAdapter.getInitialState();

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNote: (state: NotesState, action: PayloadAction<NoteObject>) => {
            notesAdapter.addOne(state, action.payload);
        },
        editNote: (state: NotesState, action: PayloadAction<NoteObject>) => {
            notesAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload
            })
        },
        deleteAllNotes: (state: NotesState) => {
            notesAdapter.removeAll(state);
        },
        deleteNote: (state: NotesState, action: PayloadAction<string>) => {
            notesAdapter.removeOne(state, action.payload)
        },
    }
})

export const {
    selectAll: selectNotesArr,
    selectById: selectNote,
    selectEntities: selectNotesEntities,
    selectIds: selectNotesIds,
    selectTotal: selectNotesCount,
} = notesAdapter.getSelectors((state: RootState) => state.notes);
export const { addNote, editNote, deleteAllNotes, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;