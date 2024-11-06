import { z } from "zod";

export const UserSignupSchema = z.object({
	email: z.string().email(),
	supabaseId: z.string().uuid().optional(),
});

export type UserSignup = z.infer<typeof UserSignupSchema>;

export const createUserSchema = () =>
	z.object({
		id: z.string(),
		email: z.string().email(),
		firstName: z.string(),
		lastName: z.string(),
	});

export type User = z.infer<ReturnType<typeof createUserSchema>>;
