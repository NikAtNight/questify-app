import React from "react";
import { View, ScrollView } from "react-native";

import { useGetUser } from "@/actions/userHooks";
import LoadingScreen from "@/components/loading-screen";
import { H3 } from "@/components/ui/typography";

export default function Main() {
	const { data, isLoading } = useGetUser();

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<ScrollView className="bg-background">
			<View className="flex-1 items-center justify-center p-5">
				<H3>
					{data.firstName} {data.lastName}
				</H3>
			</View>
		</ScrollView>
	);
}
