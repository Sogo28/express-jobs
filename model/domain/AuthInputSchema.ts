import { UserInputSchema } from "./UserInputSchema";

export const AuthInputSchema = UserInputSchema.omit({ name: true });