import { z } from "zod";

export const customerCreateSchema = z.object({
    name: z.string().min(1, "Имя обязательно"),
    surname: z.string().min(1, "Фамилия обязательна"),
    email: z.string().email("Неверный email"),
    phone_number: z.string().min(5, "Телефон обязателен"),
})

export type CreateValues = z.infer<typeof customerCreateSchema>;

export const customerUpdateSchema = z.object({
    name: z.string().optional(),
    surname: z.string().optional(),
    email: z.string().optional(),
    phone_number: z.string().optional(),
})

export type UpdateValues = z.infer<typeof customerUpdateSchema>;