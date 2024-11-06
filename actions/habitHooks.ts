import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { UserHabit, UserHabitRetrieve, UserHabitUpdate, UserHabitCreate } from "@/lib/models/habits";

const getHabits = async () => {
	const response = await axios.get("/habits/");
	return response.data;
};

const useGetHabits = () => {
	return useQuery("habits", getHabits);
};

const createUserHabit = async (data: UserHabitCreate) => {
	const response = await axios.post("/user-habits/", data);
	return response.data;
};

const useCreateUserHabit = () => {
	const queryClient = useQueryClient();
	return useMutation(createUserHabit, {
		onSuccess: () => {
			queryClient.invalidateQueries("userHabits");
		},
	});
};

const getUserHabits = async () => {
	const response = await axios.get("/user-habits/");
	return response.data as UserHabit[];
};

const useGetUserHabits = () => {
	return useQuery("userHabits", getUserHabits);
};

const getUserHabit = async (habitId: string) => {
	const response = await axios.get(`/user-habits/${habitId}/`);
	return response.data as UserHabitRetrieve;
};

const useGetUserHabit = (habitId: string) => {
	return useQuery(["userHabit", habitId], () => getUserHabit(habitId));
};

const updateUserHabit = async ({ habitId, data }: { habitId: string; data: UserHabitUpdate }) => {
	const response = await axios.patch(`/user-habits/${habitId}/`, data);
	return response.data;
};

const useUpdateUserHabit = () => {
	const queryClient = useQueryClient();

	return useMutation(updateUserHabit, {
		onSuccess: () => {
			queryClient.invalidateQueries("userHabits");
		},
	});
};
const trackUserHabit = async (data: { habit: string }) => {
	try {
		const response = await axios.post(`/habit-logs/`, data);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data || error.message);
		} else {
			throw new Error("An unexpected error occurred. Please try again.");
		}
	}
};

const useTrackUserHabit = () => {
	return useMutation(trackUserHabit);
};

export { useGetHabits, useGetUserHabits, useGetUserHabit, useUpdateUserHabit, useTrackUserHabit, useCreateUserHabit };
