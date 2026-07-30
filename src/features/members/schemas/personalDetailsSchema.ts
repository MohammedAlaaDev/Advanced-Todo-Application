import z from "zod";

const egyptianNumberRegex = /^(01[0125]\d{8}|)$/;

export const personalDetailsSchema = z.object({
    name: z.string().min(1, "Name is required").max(16, "Max 16 chars"),
    role: z.string().min(1, "Role is required").max(20, "Max 20 chars"),

    // @gmail.com = 10 characters
    // 30 - 10 = 20 characters maximum
    email: z.email().max(30, "Max gmail username 20 chars"),
    phone: z.string().regex(egyptianNumberRegex, "Enter a valid Egyptian number"),
})

export const roleAndNameSchema = personalDetailsSchema.pick({
    name: true,
    role: true,
})

export const emailSchema = personalDetailsSchema.pick({
    email: true,
})

export const phoneSchema = personalDetailsSchema.pick({
    phone: true,
})