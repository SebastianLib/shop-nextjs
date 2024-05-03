import { z } from "zod";

export const CreateProductSchema = z.object({
    name: z.string().min(2).max(50),
    categoryId: z.string(),
    sizeId: z.string(),
    description: z.string().min(10).max(500),
    price: z.number(),
    gender: z.string(),
  });

  export type CreateProductSchemaType = z.infer<typeof CreateProductSchema>