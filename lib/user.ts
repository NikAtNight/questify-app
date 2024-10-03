import * as z from "zod";

export const createUserSchema = () =>
	z.object({
		id: z.string(),
		email: z.string().email(),
		firstName: z.string(),
		lastName: z.string(),
	});

export type User = z.infer<ReturnType<typeof createUserSchema>>;
