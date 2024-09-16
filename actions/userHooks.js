import axios from "axios";
import { useMutation, useQuery } from "react-query";

const postUser = async (data) => {
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
