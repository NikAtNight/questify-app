import { useRouter } from "expo-router";
import { ChevronLeft, Dot, Search, Clock, Star } from "lucide-react-native";
import { useState } from "react";
import { View, ScrollView } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { H2, Muted } from "@/components/ui/typography";
import { DIFFICULTY_LEVELS_MAP } from "@/lib/models/habits";
import { getDifficultyColor } from "@/lib/utils";

const archivedQuests = [
	{
		id: "1",
		name: "Learn Spanish",
		category: "Education",
		completedDate: "2024-10-20",
		totalPoints: 500,
		difficultyLevel: "MEDIUM",
	},
	{
		id: "2",
		name: "Run a Marathon",
		category: "Fitness",
		completedDate: "2024-09-15",
		totalPoints: 1000,
		difficultyLevel: "HARD",
	},
	{
		id: "3",
		name: "Write a Novel",
		category: "Creativity",
		completedDate: "2024-08-30",
		totalPoints: 750,
		difficultyLevel: "HARD",
	},
];

export default function ArchivedQuests() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");

	const filteredQuests = archivedQuests.filter((quest) => quest.name.toLowerCase().includes(searchQuery.toLowerCase()));

	return (
		<SafeAreaView className="flex-1 bg-background p-4 gap-y-4">
			<View className="flex-row items-center justify-between w-full">
				<Button onPress={() => router.back()} variant="ghost" size="icon">
					<ChevronLeft />
				</Button>
				<H2>Archived Quests</H2>
				<Button variant="ghost" size="icon" className="invisible">
					<Dot />
				</Button>
			</View>

			<Input placeholder="Search archived quests" value={searchQuery} onChangeText={setSearchQuery} icon={<Search />} />

			<ScrollView className="flex-1">
				{filteredQuests.map((quest) => (
					<Card className="mb-4">
						<CardHeader>
							<View className="flex-row justify-between items-center">
								<Text className="text-lg font-bold">{quest.name}</Text>
								<Badge className={`${getDifficultyColor(quest.difficultyLevel)}`}>
									<Text>{DIFFICULTY_LEVELS_MAP[quest.difficultyLevel]}</Text>
								</Badge>
							</View>
							<Muted className="text-gray-400">{quest.category}</Muted>
						</CardHeader>
						<CardContent>
							<View className="flex-row justify-between items-center">
								<View className="flex-row items-center gap-x-2">
									<Clock />
									<Text>Completed: {quest.completedDate}</Text>
								</View>
								<View className="flex-row items-center gap-x-2">
									<Star />
									<Text>{quest.totalPoints} points</Text>
								</View>
							</View>
						</CardContent>
						<CardFooter className="flex flex-row justify-end">
							<Button variant="outline">
								<Text>View Details</Text>
							</Button>
						</CardFooter>
					</Card>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}
