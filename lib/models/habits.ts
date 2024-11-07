import { z } from "zod";

export const DIFFICULTY_LEVELS = ["EASY", "MEDIUM", "HARD"] as const;
export const STATUS_LEVELS = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "ABANDONED"] as const;

export const DIFFICULTY_LEVELS_MAP = {
	EASY: "Easy",
	MEDIUM: "Medium",
	HARD: "Hard",
};

export const STATUS_LEVELS_MAP = {
	NOT_STARTED: "Not Started",
	IN_PROGRESS: "In Progress",
	COMPLETED: "Completed",
	ABANDONED: "Abandoned",
};

export const HabitSchema = z.object({
	id: z.string().uuid(),
	name: z.string().max(255),
	category: z.array(
		z.object({
			id: z.string().uuid(),
			name: z.string(),
		}),
	),
	difficultyLevel: z.enum(DIFFICULTY_LEVELS),
	milestones: z.array(
		z.object({
			day: z.number(),
			label: z.string(),
			points: z.number(),
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
		difficultyLevel: z.enum(DIFFICULTY_LEVELS),
	}),
	status: z.enum(STATUS_LEVELS),
	currentStreak: z.number().int().min(0),
	nextMilestone: z.number().int(),
	progressPercentage: z.number().min(0).max(100),
});

export type UserHabit = z.infer<typeof UserHabitSchema>;

export const UserHabitCreateSchema = z.object({
	habit: z.string().uuid(),
});

export type UserHabitCreate = z.infer<typeof UserHabitCreateSchema>;

export const UserHabitRetrieveSchema = z.object({
	id: z.string().uuid(),
	habit: z.object({
		id: z.string().uuid(),
		name: z.string().max(255),
		difficultyLevel: z.enum(DIFFICULTY_LEVELS),
		milestones: z.array(
			z.object({
				day: z.number(),
				name: z.string(),
			}),
		),
	}),
	startDate: z.string().datetime(),
	completionDate: z.string().datetime().nullable(),
	status: z.enum(STATUS_LEVELS),
	currentStreak: z.number().int().min(0),
	bestStreak: z.number().int().min(0),
	totalDaysCompleted: z.number().int().min(0),
	nextMilestone: z.number().int(),
	progressPercentage: z.number().min(0).max(100),
	habitLogs: z.array(
		z.object({
			createdAt: z.string().datetime(),
		}),
	),
});

export type UserHabitRetrieve = z.infer<typeof UserHabitRetrieveSchema>;

export const UserHabitUpdateSchema = z.object({
	status: z.enum(STATUS_LEVELS),
});

export type UserHabitUpdate = z.infer<typeof UserHabitUpdateSchema>;

export const HabitLogSchema = z.object({
	createdAt: z.string().datetime(),
});

export type HabitLog = z.infer<typeof HabitLogSchema>;
