import { z } from "zod";

export const SkillSchema = z.object({
	id: z.string().uuid(),
	skill_name: z.string().max(255),
	description: z.string(), // Skill description text
	category: z.enum(["Health", "Productivity", "Learning"]), // Defined categories for skills
	reward_points: z.number().int().min(0), // Reward points as a non-negative integer
	created_at: z.string().datetime(), // ISO 8601 date string for creation
	updated_at: z.string().datetime(), // ISO 8601 date string for updates
});

// Infer TypeScript type from the schema
export type Skill = z.infer<typeof SkillSchema>;
