import { Stack } from "expo-router";
import React from "react";

import { theme } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";

export default function ProtectedLayout() {
	const { isDarkColorScheme } = useColorScheme();

	const colors = isDarkColorScheme ? theme.dark : theme.light;

	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: colors.background,
				},
				headerTitleStyle: {
					color: colors.primary,
				},
				headerTitle: "",
				headerShown: false,
			}}
		>
			<Stack.Screen name="main" />
			<Stack.Screen name="settings" />
		</Stack>
	);
}
