import axios from "axios";
import { useMutation, useQuery } from "react-query";

import { UserSignup } from "@/lib/models/user";

const postUser = async (data: UserSignup) => {
	const response = await axios.post("/users/", data);
	return response.data;
};

const usePostUser = () => {
	return useMutation(postUser);
};

const getUser = async () => {
	const response = await axios.get(`/users/me/`);
	return response.data;
};

const useGetUser = () => {
	return useQuery("getUser", getUser);
};

export { usePostUser, useGetUser };
