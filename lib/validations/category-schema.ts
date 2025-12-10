import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(2, { message: "Kategori adı en az 2 karakter olmalıdır." }),
  description: z.string().optional(),
  slug: z.string().optional(),
  parentId: z.number().nullable().optional(),
  isActive: z.boolean().default(true),
  // 👇 BU SATIRI EKLE
  image: z.string().nullable().optional(), 
});

export type CategoryInput = z.infer<typeof CategorySchema>;