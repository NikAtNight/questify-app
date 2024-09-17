import { Tabs } from "expo-router";
import { House, User } from "lucide-react-native";
import React from "react";

import { theme } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";

export default function ProtectedLayout() {
	const { colorScheme } = useColorScheme();

	return (
		<Tabs
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarStyle: {
					backgroundColor: colorScheme === "dark" ? theme.dark.background : theme.light.background,
				},
				tabBarShowLabel: false,
				tabBarIcon: ({ color }) => {
					if (route.name === "home") return <House color={color} />;
					if (route.name === "profile") return <User color={color} />;
				},
			})}
		>
			<Tabs.Screen name="home" />
			<Tabs.Screen name="profile" />
		</Tabs>
	);
}
