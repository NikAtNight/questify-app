import { z } from "zod";

export const HabitSchema = z.object({
	id: z.string().uuid(),
	name: z.string().max(255),
	category: z.array(
		z.object({
			id: z.string().uuid(),
			name: z.string(),
		}),
	),
	difficultyLevel: z.enum(["Easy", "Medium", "Hard"]),
	milestones: z.array(
		z.object({
			day: z.number(),
			title: z.string(),
		}),
	),
	skills: z.array(
		z.object({
			id: z.string().uuid(),
			name: z.string(),
			description: z.string(),
			points: z.number(),
			milestones: z.string().uuid(),
		}),
	),
});

// Infer TypeScript type from the schema
export type Habit = z.infer<typeof HabitSchema>;

export const UserHabitSchema = z.object({
	id: z.string().uuid(),
	user: z.string().uuid(),
	habit: z.object({
		id: z.string().uuid(),
		name: z.string().max(255),
		difficultyLevel: z.string().max(255),
	}),
	status: z.enum(["Not Started", "In Progress", "Completed", "Abandoned"]),
	currentStreak: z.number().int().min(0),
	nextMilestone: z.number().int(),
	nextSkillUnlock: z.string().max(255),
	progressPercentage: z.number().min(0).max(100),
	notificationsEnabled: z.boolean(),
});

// Infer TypeScript type from the schema
export type UserHabit = z.infer<typeof UserHabitSchema>;
