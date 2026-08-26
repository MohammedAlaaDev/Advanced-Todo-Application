import type { taskCategoriesSchema, taskDescriptionSchema, taskDetailsSchema, taskTitleSchema } from "@/features/tasks/schemas/taskDetailsSchema";
import type z from "zod";
import type { MemberObject } from "@/features/members/types";
import type { EntityState } from "@reduxjs/toolkit";

export interface ModifiedMember extends MemberObject {
    selected: boolean;
}

export interface taskDetailsObject {
    title: string,
    categories: string[],
    description: string,
    deadline: string,
}

export interface TaskObject extends taskDetailsObject {
    id: string,
    progress: number,
    media: string[],
    associatedMembersIDs: string[],
    tasksByUserId: {[userId: string]: string[]},
    createdAt: string;
    thumbnail: string;
}

export interface TasksState extends EntityState<TaskObject, string> {
    tempTaskDetails: TaskObject;
}

export type TaskError = z.inferFormattedError<typeof taskDetailsSchema>;
export type TaskTitleError = z.inferFormattedError<typeof taskTitleSchema>;
export type TaskCategoriesError = z.inferFormattedError<typeof taskCategoriesSchema>;
export type TaskDescriptionError = z.inferFormattedError<typeof taskDescriptionSchema>;
