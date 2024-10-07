import { Stack } from "expo-router";
import React from "react";

export default function HomeStack() {
	return (
		<Stack
			screenOptions={({ route }) => ({
				headerShown: false,
			})}
		>
			<Stack.Screen name="main" />
			<Stack.Screen name="details" />
		</Stack>
	);
}
