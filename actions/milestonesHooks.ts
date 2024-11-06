import axios from "axios";
import { useQuery } from "react-query";

import { Milestone } from "@/lib/models/milestones";

const getHabitMilestones = async (habitId?: string) => {
	if (!habitId) return null;
	const response = await axios.get(`/habits/${habitId}/milestones/`);
	return response.data as Milestone[];
};

const useGetHabitMilestones = (habitId?: string) => {
	return useQuery(["habitMilestones", habitId], () => getHabitMilestones(habitId), {
		enabled: !!habitId,
	});
};

export { useGetHabitMilestones };
