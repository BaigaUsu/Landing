import { z } from "zod";

export const projectCreateSchema = z.object({
    project_name: z.string().min(1, "Название проекта обязательно"),
    customer: z.number({ required_error: "Клиент обязателен" }),
    project_manager: z.number({ required_error: "Проэкт мэнеджер обязателен" }),
    description: z.string().min(1, "Описание обязательно"),
    start_date: z.string().min(1, "Дата начала обязательна"),
    end_date: z.string().min(1, "Дата окончания обязательна"),
    cost: z.number({ required_error: "Стоимость обязательна" }),
    application: z.union([z.number(), z.null()]).optional(),
    tasks: z.array(z.any()).optional(),
});

export type ProjectCreateFormValues = z.infer<typeof projectCreateSchema>;

export const projectUpdateSchema = z.object({
    project_name: z.string().min(1, "Название обязательно"),
    customer: z.number().nullable().optional(),
    project_manager: z.number().nullable().optional(),
    description: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    cost: z.number().nonnegative().max(99999999, "Стоимость не может превышать 8 цифр").optional(),
    status: z.string().optional(),
    comment: z.string().optional(),
    tasks: z.array(z.any()).optional(),
});

export type ProjectUpdateFormValues = z.infer<typeof projectUpdateSchema>;