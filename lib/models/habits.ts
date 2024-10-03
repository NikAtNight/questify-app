import { z } from "zod";

export const HabitSchema = z.object({
	id: z.string().uuid(),
	name: z.string().max(255),
	category: z.enum(["Health", "Productivity", "Learning"]), // Using enum for defined categories
	difficulty_level: z.enum(["Easy", "Medium", "Hard"]), // Defined difficulty levels
	milestones: z.array(
		z.object({
			day: z.number(), // Milestone day (e.g., 7, 30, etc.)
			title: z.string(), // Milestone title (e.g., "Beginner Athlete")
			points: z.number(), // Points earned for reaching milestone
		}),
	),
	skills: z.array(
		z.object({
			day: z.number(), // Day the skill is unlocked
			skill: z.string(), // Skill description
		}),
	),
	created_at: z.string().datetime(), // ISO 8601 date string
	updated_at: z.string().datetime(), // ISO 8601 date string
});

// Infer TypeScript type from the schema
export type Habit = z.infer<typeof HabitSchema>;
