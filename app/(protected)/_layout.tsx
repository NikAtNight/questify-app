import { Tabs } from "expo-router";
import { House, ArrowLeftRight, User, ChartPie } from "lucide-react-native";
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
					if (route.name === "home") return <House />;
					if (route.name === "transactions") return <ArrowLeftRight />;
					if (route.name === "budgets") return <ChartPie />;
					if (route.name === "settings") return <User />;
				},
			})}
		>
			<Tabs.Screen name="home" />
			<Tabs.Screen name="transactions" />
			<Tabs.Screen name="budgets" />
			<Tabs.Screen name="settings" />
		</Tabs>
	);
}
