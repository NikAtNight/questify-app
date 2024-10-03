import { Stack } from "expo-router";
import { BookMarked, NotebookPen } from "lucide-react-native";
import React from "react";

import { theme } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";

export default function ProtectedLayout() {
	const { colorScheme } = useColorScheme();

	const colors = colorScheme === "dark" ? theme.dark : theme.light;

	return (
		<Stack
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarShowLabel: false,
				tabBarPosition: "top",
				tabBarIcon: ({ color }: { color: string }) => {
					if (route.name === "habits") return <NotebookPen color={color} />;
					if (route.name === "skills") return <BookMarked color={color} />;
				},
			})}
		>
			<Stack.Screen name="habits" />
			<Stack.Screen name="skills" />
		</Stack>
	);
}
