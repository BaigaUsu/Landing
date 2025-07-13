import { z } from "zod";

export const applicationSchema = z.object({
    name: z.string().min(1, "Имя обязательно"),
    surname: z.string().min(1, "Фамилия обязательна"),
    email: z.string().email("Некорректный email"),
    phone_number: z.string().min(1, "Телефон обязателен"),
})

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

export const projectSchema = z.object({
    project_name: z.string().min(1, "Название проекта обязательно"),
    client: z.union([z.number(), z.null()]),
    description: z.string().optional(),
    start_date: z.string().nullable().optional(),
    end_date: z.string().nullable().optional(),
    cost: z.union([z.number(), z.null()]).optional(),
    status: z.string().nullable().optional(),
    application: z.union([z.number(), z.null()]).optional(),
  });

  export const projectUpdateSchema = z.object({
    project_name: z.string().min(1, "Название обязательно"),
    client: z.number().nullable(),
    description: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    cost: z.number().nonnegative().optional(),
    status: z.string().optional(),
    comment: z.string().optional(),
  });