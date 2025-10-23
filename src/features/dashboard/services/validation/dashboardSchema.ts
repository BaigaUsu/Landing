import { z } from "zod";

export const dashboardCreateSchema = z.object({
    name: z.string().min(1, "Имя обязательно"),
    surname: z.string().min(1, "Фамилия обязательна"),
    email: z.string().email("Неверный email"),
    phone_number: z.string().min(5, "Телефон обязателен"),
    specializations: z.array(z.string()).default([]), // 👈 не optional
    is_superuser: z.boolean().default(false),  
    password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
    confirm_password: z.string().min(6, "Подтверждение пароля обязательно"),
}).refine((data) => data.password === data.confirm_password, {
    message: "Пароли не совпадают",
    path: ["confirm_password"], 
}).superRefine((data, ctx) => {
    if (!data.is_superuser && data.specializations.length === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Менеджер должен иметь хотя бы одну специализацию",
            path: ["specializations"],
        });
    }
});

export type CreateValues = z.infer<typeof dashboardCreateSchema>;

export const dashboardUpdateSchema = z.object({
    name: z.string().optional(),
    surname: z.string().optional(),
    email: z.string().optional(),
    phone_number: z.string().optional(),
    specializations: z.array(z.string()).optional(),
    is_superuser: z.boolean().optional(),  
    password: z
        .string()
        .transform((val) => (val === "" ? undefined : val))
        .optional()
        .refine((val) => !val || val.length >= 6, {
            message: "Пароль должен быть не менее 6 символов",
    }),

    confirm_password: z
        .string()
        .transform((val) => (val === "" ? undefined : val))
        .optional(),
}).refine((data) => {
    if (data.password || data.confirm_password) {
        return data.password === data.confirm_password;
    }
    return true;
}, {
    message: "Пароли не совпадают",
    path: ["confirm_password"],
});

export type UpdateValues = z.infer<typeof dashboardUpdateSchema>;