import {z} from "zod";

export const zodFormSchema = z.object({
    name: z.string().optional(),
    email: z
        .string()
        .min(1, "Email không được để trống")
        .email("Email không hợp lệ"),
    domains: z.array(z.string().optional()),
    questions: z.array(z.string().min(1, "Câu hỏi không được để trống")).min(1, "Câu hỏi không được để trống"),
});