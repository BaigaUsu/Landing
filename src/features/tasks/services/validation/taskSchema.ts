import { z } from "zod";

export const taskSchema = z.object({
    name: z.string().min(1, "Имя обязательно"),
    surname: z.string().min(1, "Фамилия обязательна"),
    email: z.string().email("Неверный email"),
    phone_number: z.string().min(5, "Телефон обязателен"),
    action: z.string().nullable().optional(),
    action_date: z.string().nullable().optional(),
    action_time: z.string().nullable().optional(),
    previous_task: z.number().nullable().optional(),
    application: z.number().nullable().optional(),
    project: z.number().nullable().optional(),
});

export type FormValues = z.infer<typeof taskSchema>;

export const taskUpdateSchema = z.object({
    name: z.string().min(1, "Имя обязательно"),
    surname: z.string().min(1, "Фамилия обязательна"),
    email: z.string().email("Неверный email"),
    phone_number: z.string().min(5, "Телефон обязателен"),
    action: z.string().nullable().optional(),
    action_date: z.string().nullable().optional(),
    action_time: z.string().nullable().optional(),
    status: z.string().min(1, "Статус обязателен"),
    project: z.number().nullable().optional(),
});