import { useRouter } from "expo-router";
import { ChevronLeft, Dot } from "lucide-react-native";
import { View } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, H2, Muted } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";

export default function Settings() {
	const router = useRouter();
	const { signOut } = useSupabase();

	return (
		<SafeAreaView className="flex-1 bg-background p-4">
			<View className="flex flex-row items-center justify-between w-full">
				<Button onPress={() => router.back()} variant="ghost" size="icon">
					<ChevronLeft />
				</Button>
				<H2>Settings</H2>
				<Button variant="ghost" size="none" className="invisible">
					<Dot />
				</Button>
			</View>
			<View className="flex-1 items-center justify-center gap-y-4">
				<H1 className="text-center">Sign Out</H1>
				<Muted className="text-center">Sign out and return to the welcome screen.</Muted>
				<Button
					className="w-full"
					size="default"
					variant="default"
					onPress={() => {
						signOut();
					}}
				>
					<Text>Sign Out</Text>
				</Button>
			</View>
		</SafeAreaView>
	);
}
