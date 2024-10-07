import { z } from "zod";

export const SkillSchema = z.object({
	id: z.string().uuid(),
	name: z.string().max(255),
	description: z.string(),
	reward_points: z.number().int().min(0),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
});

// Infer TypeScript type from the schema
export type Skill = z.infer<typeof SkillSchema>;
