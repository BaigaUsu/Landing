import { z } from "zod";

  export const projectUpdateSchema = z.object({
    project_name: z.string().min(1, "Название обязательно"),
    client: z.number().nullable().optional(),
    description: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    cost: z.number().nonnegative().optional(),
    status: z.string().optional(),
    comment: z.string().optional(),
  });