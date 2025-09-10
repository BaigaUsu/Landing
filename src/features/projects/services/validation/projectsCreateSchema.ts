import { z } from "zod";
import { ta } from "zod/v4/locales";

export const projectCreateSchema = z.object({
    project_name: z.string().min(1, "Название проекта обязательно"),
    client: z.number().nullable().optional(),
    description: z.string().optional(),
    start_date: z.string().nullable().optional(),
    end_date: z.string().nullable().optional(),
    cost: z.union([z.number(), z.null()]).optional(),
    status: z.string().nullable().optional(),
    application: z.union([z.number(), z.null()]).optional(),
    tasks: z.array(z.any()).optional(),
  });

  export type ProjectCreateFormValues = z.infer<typeof projectCreateSchema>;

  export const projectUpdateSchema = z.object({
    project_name: z.string().min(1, "Название обязательно"),
    client: z.number().nullable().optional(),
    description: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    cost: z.number().nonnegative().optional(),
    status: z.string().optional(),
    comment: z.string().optional(),
    tasks: z.array(z.any()).optional(),
  });

export type ProjectUpdateFormValues = z.infer<typeof projectUpdateSchema>;