import { z } from "zod";

export const taskCreateSchema = z.object({
    name: z.string().optional(),
    surname: z.string().optional(),
    email: z.string().optional(),
    phone_number: z.string().optional(),
    action: z.string().min(1, "Действие обязательно"),
    action_date: z.string(),
    action_time: z.string(),
    assignees: z.array(z.any()),
    previous_task: z.number().nullable(),
    application: z.number().nullable(),
    project: z.number().nullable(),
});

export type FormValues = z.infer<typeof taskCreateSchema>;

export const taskUpdateSchema = z.object({
    name: z.string().min(1, "Имя обязательно"),
    surname: z.string().min(1, "Фамилия обязательна"),
    email: z.string().email("Неверный email"),
    phone_number: z.string().min(5, "Телефон обязателен"),
    action: z.string().nullable().optional(),
    action_date: z.string().nullable().optional(),
    action_time: z.string().nullable().optional(),
    assignees: z.array(z.any()),
    status: z.string().min(1, "Статус обязателен"),
    project: z.number().nullable().optional(),
});

export type TaskFormData = z.infer<typeof taskUpdateSchema>;