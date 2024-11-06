import { z } from "zod";

export const MilestoneSchema = z.object({
	id: z.string(),
	name: z.string(),
	day: z.number(),
});

export type Milestone = z.infer<typeof MilestoneSchema>;
