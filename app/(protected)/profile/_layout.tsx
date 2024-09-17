import { Stack, useRouter } from "expo-router";
import { Settings } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

import { useSupabase } from "@/context/supabase-provider";
import { theme } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";

export default function ProtectedLayout() {
	const { colorScheme } = useColorScheme();
	const { user } = useSupabase();
	const { push } = useRouter();

	return (
		<Stack
			screenOptions={({ route }) => ({
				headerStyle: {
					backgroundColor: colorScheme === "dark" ? theme.dark.background : theme.light.background,
				},
				headerTitleStyle: {
					color: colorScheme === "dark" ? theme.dark.primary : theme.light.primary,
				},
				headerTitle: user?.email,
			})}
		>
			<Stack.Screen
				name="home"
				options={{
					headerRight: () => (
						<TouchableOpacity onPress={() => push("/(protected)/profile/settings")}>
							<Settings color={colorScheme === "dark" ? theme.dark.primary : theme.light.primary} />
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen
				name="settings"
				options={{
					headerTitle: "Settings",
					headerBackTitleVisible: false,
				}}
			/>
		</Stack>
	);
}
