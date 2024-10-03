import { useRouter } from "expo-router";
import { View } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H2 } from "@/components/ui/typography";

export default function Create() {
	const router = useRouter();

	return (
		<SafeAreaView className="flex-1 items-center bg-background p-4 gap-y-4">
			<H2>Begin a Quest</H2>
			<View className="flex-1 items-center w-full justify-center gap-y-4">
				<Button className="w-full" onPress={() => router.push("/create-habit/tabs/habits")}>
					<Text>Search Quests</Text>
				</Button>
				<Button className="w-full" onPress={() => router.push("/create-habit/tabs/habits")}>
					<Text>New Quest</Text>
				</Button>
			</View>
		</SafeAreaView>
	);
}
