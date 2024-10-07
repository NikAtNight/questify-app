import { z } from "zod";

export const UserSignupSchema = z.object({
	email: z.string().email(),
	supabaseId: z.string().uuid().optional(),
});

export type UserSignup = z.infer<typeof UserSignupSchema>;
