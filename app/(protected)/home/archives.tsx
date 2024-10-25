import { useRouter } from "expo-router";
import { ChevronLeft, Dot } from "lucide-react-native";
import { View } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { H2 } from "@/components/ui/typography";
export default function AbandonedQuests() {
	const router = useRouter();
	return (
		<SafeAreaView className="flex flex-1 bg-background p-4">
			<View className="flex flex-row items-center justify-between w-full">
				<Button onPress={() => router.back()} variant="ghost" size="icon">
					<ChevronLeft />
				</Button>
				<H2>Archived Quests</H2>
				<Button variant="ghost" size="none" className="invisible">
					<Dot />
				</Button>
			</View>
		</SafeAreaView>
	);
}
