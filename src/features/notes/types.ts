import type { noteSchema } from "@/features/notes/schemas/noteSchema";
import type { EntityState } from "@reduxjs/toolkit";
import type z from "zod";

export interface NoteObject {
    id: string;
    createdAt: string;
    edited?: boolean;
    title: string;
    description: string;
    category: string[];
}

export interface NotesState extends EntityState<NoteObject, string> { }


export type NoteError = z.inferFormattedError<typeof noteSchema>