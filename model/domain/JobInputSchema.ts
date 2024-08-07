import z from "zod";

export const JobInputSchema = z.object({
  title: z.string(),
  type: z.string(),
  description: z.string(),
  location: z.string(),
  salary: z.string(),
  userId: z.string()
});

export type JobInputType = z.infer<typeof JobInputSchema>;