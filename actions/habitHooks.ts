import axios from "axios";
import { useQuery } from "react-query";

import { UserHabit, UserHabitRetrieve } from "@/lib/models/habits";

const getHabits = async () => {
	const response = await axios.get("/habits/");
	return response.data;
};

const useGetHabits = () => {
	return useQuery("habits", getHabits);
};

const getUserHabits = async () => {
	const response = await axios.get("/user-habits/");
	return response.data as UserHabit[];
};

const useGetUserHabits = () => {
	return useQuery("getUserHabits", getUserHabits);
};

const getUserHabit = async (habitId: string) => {
	const response = await axios.get(`/user-habits/${habitId}/`);
	return response.data as UserHabitRetrieve;
};

const useGetUserHabit = (habitId: string) => {
	return useQuery(["getUserHabit", habitId], () => getUserHabit(habitId));
};

export { useGetHabits, useGetUserHabits, useGetUserHabit };
