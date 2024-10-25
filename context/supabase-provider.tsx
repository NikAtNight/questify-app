import { Session, User } from "@supabase/supabase-js";
import { usePostUser } from "actions/userHooks";
import { useRouter, useSegments, SplashScreen } from "expo-router";
import React, { useEffect } from "react";
import { create } from "zustand";

import { supabase } from "@/config/supabase";

SplashScreen.preventAutoHideAsync();

type SupabaseStore = {
	user: User | null;
	session: Session | null;
	initialized: boolean;
	setUser: (user: User | null) => void;
	setSession: (session: Session | null) => void;
	setInitialized: (initialized: boolean) => void;
};

type SupabaseProviderProps = {
	children: React.ReactNode;
};

const useSupabaseStore = create<SupabaseStore>((set) => ({
	user: null,
	session: null,
	initialized: false,
	setUser: (user) => set({ user }),
	setSession: (session) => set({ session }),
	setInitialized: (initialized) => set({ initialized }),
}));

export const useSupabase = () => {
	const { user, session, initialized } = useSupabaseStore();
	const { mutateAsync, isError, error: err } = usePostUser();

	const signUp = async (email: string, password: string) => {
		const { error, data } = await supabase.auth.signUp({
			email,
			password,
		});
		if (error) {
			throw error;
		}

		await mutateAsync({ email, supabaseId: data?.user?.id });

		if (isError) {
			throw err;
		}
	};

	const signInWithPassword = async (email: string, password: string) => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			throw error;
		}
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			throw error;
		}
	};

	return {
		user,
		session,
		initialized,
		signUp,
		signInWithPassword,
		signOut,
	};
};

export const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
	const router = useRouter();
	const segments = useSegments();
	const { setUser, setSession, setInitialized, initialized, session } = useSupabaseStore();

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
			setSession(session);
			setUser(session ? session.user : null);
			setInitialized(true);
		});
		return () => {
			data.subscription.unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (!initialized) return;

		const inProtectedGroup = segments[0] === "(protected)";

		if (session && !inProtectedGroup) {
			router.replace("/(protected)/home");
		} else if (!session) {
			router.replace("/(public)/welcome");
		}

		// HACK: Use SplashScreen and hide it after a small delay (500 ms)
		setTimeout(() => {
			SplashScreen.hideAsync();
		}, 500);
	}, [initialized, session]);

	return <>{children}</>;
};
