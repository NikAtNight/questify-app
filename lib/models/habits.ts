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
});

export type UserHabit = z.infer<typeof UserHabitSchema>;

export const UserHabitRetrieveSchema = z.object({
	id: z.string().uuid(),
	habit: z.object({
		id: z.string().uuid(),
		name: z.string().max(255),
		difficultyLevel: z.string().max(255),
		skills: z.array(
			z.object({
				id: z.string().uuid(),
				name: z.string(),
				milestones: z.number(),
			}),
		),
	}),
	startDate: z.string().datetime(),
	completionDate: z.string().datetime().nullable(),
	status: z.enum(["Not Started", "In Progress", "Completed", "Abandoned"]),
	currentStreak: z.number().int().min(0),
	bestStreak: z.number().int().min(0),
	totalDaysCompleted: z.number().int().min(0),
	nextMilestone: z.number().int(),
	nextSkillUnlock: z.string(),
	progressPercentage: z.number().min(0).max(100),
	habitLogs: z.array(
		z.object({
			createdAt: z.string().datetime(),
		}),
	),
});

export type UserHabitRetrieve = z.infer<typeof UserHabitRetrieveSchema>;

export const UserHabitUpdateSchema = z.object({
	status: z.enum(["Not Started", "In Progress", "Completed", "Abandoned"]),
});

export type UserHabitUpdate = z.infer<typeof UserHabitUpdateSchema>;
