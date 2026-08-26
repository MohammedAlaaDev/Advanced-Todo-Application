import type { EntityState } from "@reduxjs/toolkit";

export interface TodoObject {
    id: string;
    title: string;
    category: (string | undefined)[];
    isCompleted: boolean;
    createdAt: string;
    editedAt: string;
    edited?: boolean;
}

export interface todoState extends EntityState<TodoObject, string> { }