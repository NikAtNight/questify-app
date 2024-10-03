import { Stack } from "expo-router";
import React from "react";

export default function ProtectedLayout() {
	return (
		<Stack
			screenOptions={({ route }) => ({
				headerShown: false,
			})}
		>
			<Stack.Screen name="habits" />
			<Stack.Screen name="skills" />
		</Stack>
	);
}
