import { z } from "zod";

export const todoSchema = z.object({
    title: z.string().max(10, "Max 10 characters").min(1, "Please enter a title"),
    category1: z.string().max(12, "Max 12 characters").optional(),
    category2: z.string().max(12, "Max 12 characters").optional(),
})

export type TodoFormError = z.inferFormattedError<typeof todoSchema>;