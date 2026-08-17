import z from "zod";

export const taskDetailsSchema = z.object({
    title: z.string().min(1, "Enter a title").max(20, "max 20 chars"),
    categories: z.array(z.string().max(15, "max 15 chars")),
    description: z.string().max(300, "max 300 chars"),
    deadline: z.string(),
})

export const taskTitleSchema = taskDetailsSchema.pick({
    title:true,
})

export const taskCategoriesSchema = taskDetailsSchema.pick({
    categories:true,
})

export const taskDescriptionSchema = taskDetailsSchema.pick({
    description:true,
})