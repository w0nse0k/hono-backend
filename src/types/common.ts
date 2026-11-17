import z from "zod";

export const UpsertSchema = z.object({
  affectedRows: z.number(),
  insertId: z.number(),
  warningStatus: z.number(),
});

export type UpsertResult = z.infer<typeof UpsertSchema>;

export const IDSchema = z.object({ id: z.coerce.number() });

export const PageSchema = z.object({
  size: z.coerce.number().default(10),
  page: z.coerce.number().default(1),
});
