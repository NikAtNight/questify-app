import { Tabs } from "expo-router";
import { Swords, Shield, Crown } from "lucide-react-native";
import React from "react";

import { theme } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";

export default function ProtectedLayout() {
	const { colorScheme } = useColorScheme();

	const colors = colorScheme === "dark" ? theme.dark : theme.light;

	return (
		<Tabs
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarStyle: {
					backgroundColor: colors.background,
					// display: route.name === "create-habit" ? "none" : "flex",
				},
				tabBarShowLabel: false,
				tabBarIcon: ({ color }) => {
					if (route.name === "home") return <Shield color={color} />;
					if (route.name === "create-habit") return <Swords color={color} />;
					if (route.name === "profile") return <Crown color={color} />;
				},
			})}
		>
			<Tabs.Screen name="home" />
			<Tabs.Screen name="create-habit" />
			<Tabs.Screen name="profile" />
		</Tabs>
	);
}
