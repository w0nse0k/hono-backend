import z from "zod";

export const BookSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  price: z.coerce.number(),
  description: z.string().default(""),
  image: z.string().default(""),
  created_at: z.date(),
});

export type Book = z.infer<typeof BookSchema>;
