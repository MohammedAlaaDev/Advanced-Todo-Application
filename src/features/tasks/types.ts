import type { taskCategoriesSchema, taskDescriptionSchema, taskDetailsSchema, taskTitleSchema } from "@/features/tasks/schemas/taskDetailsSchema";
import type z from "zod";

export interface taskByUserId {
    [userId: string]: string[];
}

export interface taskDetailsObject {
    title: string,
    categories: string[],
    description: string,
    deadline: string,
}

export interface taskObject extends taskDetailsObject {
    id: string,
    progress: number,
    media: string[],
    associatedMembersIDs: string[],
    tasksByUserId: taskByUserId,
    createdAt: string;
    thumbnail: string;
}

export interface tasksState {
    tasks: taskObject[];
    tempTaskDetails: taskObject;
}

export type TaskError = z.inferFormattedError<typeof taskDetailsSchema>;
export type TaskTitleError = z.inferFormattedError<typeof taskTitleSchema>;
export type TaskCategoriesError = z.inferFormattedError<typeof taskCategoriesSchema>;
export type TaskDescriptionError = z.inferFormattedError<typeof taskDescriptionSchema>;
