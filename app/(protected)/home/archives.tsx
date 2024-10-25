import { View } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { H2 } from "@/components/ui/typography";

export default function AbandonedQuests() {
	return (
		<SafeAreaView className="flex flex-1 bg-background">
			<H2 className="text-center">Archived Quests</H2>
		</SafeAreaView>
	);
}
