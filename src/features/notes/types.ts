import type { noteSchema } from "@/features/notes/schemas/noteSchema";
import type z from "zod";

export interface noteObject {
    id: string;
    createdAt: string;
    edited?: boolean;
    title: string;
    description: string;
    category: string[];
}

export interface notesState {
    notes: noteObject[]
}

export type NoteError = z.inferFormattedError<typeof noteSchema>