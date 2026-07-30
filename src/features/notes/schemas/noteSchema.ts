import z from "zod";

export const noteSchema = z.object({
    noteTitle: z.string().min(3, "Minimum 3 characters").max(20, "Maximum 20 characters"),
    noteDetails: z.string().max(200, "Maximum 200 characters"),
    tempCategories: z.array(z.string().max(12, "Maximum 12 characters")),
})