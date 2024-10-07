import axios from "axios";
import { useMutation, useQuery } from "react-query";

import { UserHabit } from "@/lib/models/habits";

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

export { useGetHabits, useGetUserHabits };
