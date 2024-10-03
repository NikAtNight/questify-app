import { z } from "zod";

export const UserHabitSchema = z.object({
	id: z.string().uuid(),
	user: z.string().uuid(), // User ID (UUID)
	habit: z.string().uuid(), // Habit ID (UUID)
	start_date: z.string().datetime(), // ISO 8601 date string for habit start date
	current_streak: z.number().int().min(0), // Current streak (non-negative integer)
	best_streak: z.number().int().min(0), // Best streak (non-negative integer)
	status: z.enum(["Not Started", "In Progress", "Completed", "Abandoned"]), // Habit status
	total_days_completed: z.number().int().min(0), // Total number of days completed
	next_milestone: z.number().int(), // Next milestone in days
	next_skill_unlock: z.string().max(255), // Next skill to unlock
	progress_percentage: z.number().min(0).max(100), // Progress as percentage (0-100)
	notifications_enabled: z.boolean(), // Whether notifications are enabled
	habit_logs: z.array(
		z.object({
			date: z.string(), // Date of log (could use a date string)
			status: z.enum(["Completed", "Skipped"]), // Habit status for the day
		}),
	),
	completion_date: z.string().datetime().nullable(), // Nullable completion date
	created_at: z.string().datetime(), // ISO 8601 date string for creation
	updated_at: z.string().datetime(), // ISO 8601 date string for updates
});

// Infer TypeScript type from the schema
export type UserHabit = z.infer<typeof UserHabitSchema>;
