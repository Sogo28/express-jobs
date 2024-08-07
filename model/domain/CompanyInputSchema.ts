import z from "zod";

export const CompanyInputSchema = z.object({

  name: z.string(),
  description: z.string(),
  contactEmail: z.string().email(),
  contactPhone: z.string(),
  location: z.string(),
  userId: z.string()

})

export type CompanyInputType = z.infer<typeof CompanyInputSchema>