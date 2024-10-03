import { Stack, useRouter } from "expo-router";
import { Settings } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

import { theme } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";

export default function ProtectedLayout() {
	const { colorScheme } = useColorScheme();
	const { push } = useRouter();

	const colors = colorScheme === "dark" ? theme.dark : theme.light;

	return (
		<Stack
			screenOptions={({ route }) => ({
				headerShown: false,
				headerStyle: {
					backgroundColor: colors.background,
				},
				headerTitleStyle: {
					color: colors.primary,
				},
				headerTitle: "",
			})}
		>
			<Stack.Screen name="main" />
			<Stack.Screen
				name="create"
				options={{
					headerTitle: "Settings",
					headerBackTitleVisible: false,
				}}
			/>
		</Stack>
	);
}
