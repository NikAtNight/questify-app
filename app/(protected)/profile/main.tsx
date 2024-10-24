import { useRouter } from "expo-router";
import { Settings } from "lucide-react-native";
import React from "react";
import { View, ScrollView } from "react-native";

import { useGetUser } from "@/actions/userHooks";
import LoadingScreen from "@/components/loading-screen";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { H3, H2 } from "@/components/ui/typography";

export default function Main() {
	const router = useRouter();
	const { data, isLoading } = useGetUser();

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<SafeAreaView className="flex-1 items-center bg-background p-4 gap-y-4">
			<View className="flex flex-row items-center justify-between w-full">
				<H2>Player Stats</H2>
				<Button onPress={() => router.push("/(protected)/profile/settings")} variant="ghost" size="icon">
					<Settings className="h-4 w-4" />
				</Button>
			</View>
			<ScrollView className="bg-background">
				<View className="flex-1 items-center justify-center p-5">
					<H3>
						{data.firstName} {data.lastName}
					</H3>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
