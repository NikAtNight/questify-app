import axios from "axios";

import { supabase } from "@/config/supabase";

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_ENDPOINT;

axios.interceptors.request.use(
	async (config) => {
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (session && session.access_token) {
			config.headers.Authorization = `Bearer ${session.access_token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);
