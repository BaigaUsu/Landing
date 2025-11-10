import { z } from "zod";

export const customerCreateSchema = z.object({
    name: z.string().min(1, "Имя обязательно"),
    surname: z.string().min(1, "Фамилия обязательна"),
    email: z.string().email("Неверный email"),
    phone_number: z.string().min(5, "Телефон обязателен"),
})

export type CreateValues = z.infer<typeof customerCreateSchema>;

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