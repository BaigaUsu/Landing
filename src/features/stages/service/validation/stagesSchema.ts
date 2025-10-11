import { z } from "zod";

export const stageSchema = z.object({
    task: z.string().min(1, "Введите задачу"),
    specialization: z.string().min(1, "Выберите специализацию"),
    worker: z.number(),
    start_date: z.string().min(1, "Выберите дату начала"),
    end_date: z.string().min(1, "Выберите дату окончания"),
    piece_rate_pay: z.string().min(1, "Введите сдельную оплату"),
});

export type StageFormValues = z.infer<typeof stageSchema>;


export const stageUpdateSchema = z.object({
    task: z.string().min(1, "Обязательное поле"),
    specialization: z.string().min(1, "Обязательное поле"),
    worker: z.number().nullable().optional(),
    start_date: z.string().min(1, "Обязательное поле"),
    end_date: z.string().min(1, "Обязательное поле"),
    piece_rate_pay: z.string().min(1, "Введите сдельную оплату"),
    status: z.string().min(1, "Статус обязателен"),
    comment: z.string().optional(),
});

export type StageUpdateFormValues = z.infer<typeof stageUpdateSchema>;