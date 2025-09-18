import { z } from "zod";

export const subStageSchema = z.object({
    title: z.string().min(3, "Название должно содержать минимум 3 символа"),
    task: z.string().min(5, "Описание задачи должно содержать минимум 5 символов"),
    start_date: z.string().min(1, "Выберите дату начала"),
    end_date: z.string().min(1, "Выберите дату окончания"),
}).refine(data => {
    // Дата окончания не может быть раньше даты начала
    if (data.start_date && data.end_date) {
        return new Date(data.end_date) >= new Date(data.start_date);
    }
    return true;
}, {
    message: "Дата окончания не может быть раньше даты начала",
    path: ["end_date"],
});

export type SubStageFormData = z.infer<typeof subStageSchema>;