import z from "zod";

export const JobInputSchema = z.object({
  title: z.string(),
  type: z.enum(["Full-Time", "Remote", "Part-Time", "Internship"]),
  description: z.string(),
  location: z.string(),
  salary: z.enum(["Under $50K", "$50K - 60K", "$60K - $70K", "$70K - $80K", "$90K - $100K", "$100K - $110K", "$100K - $125K", "$125K - $150K"
    , "$150K - $175K", "$175K - $200K", "Over $200k"]),
  company: z.object({
    name: z.string(),
    description: z.string(),
    contactEmail: z.string(),
    contactPhone: z.string()
  })
});

export type JobInputType = z.infer<typeof JobInputSchema>;