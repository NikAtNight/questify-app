import { useRouter } from "expo-router";
import { Search, ChevronLeft, Dot } from "lucide-react-native";
import { View, TouchableOpacity } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { H2, Muted } from "@/components/ui/typography";
import { type Habit } from "@/lib/models/habits";
import habitData from "@/test_habit_data.json";

export default function Habits() {
	const router = useRouter();

	const habits: Habit[] = habitData as Habit[];

	return (
		<SafeAreaView className="flex-1 items-center bg-background p-4 gap-y-4">
			<View className="flex flex-row items-center justify-between w-full">
				<Button onPress={() => router.back()} variant="ghost" size="none">
					<ChevronLeft />
				</Button>
				<H2>Search for Quests</H2>
				{/* Invisible button to evenly space the header */}
				<Button className="invisible" variant="ghost" size="none">
					<Dot />
				</Button>
			</View>

			<Input placeholder="" className="w-full" icon={<Search />} />

			<View className="flex-1 w-full gap-y-4">
				{habits.map((habit) => {
					return (
						<Card className="w-full">
							<CardHeader>
								<View className="flex flex-row justify-between">
									<CardTitle>{habit.name}</CardTitle>
									<CardDescription>{habit.category}</CardDescription>
								</View>
								<CardDescription>{habit.difficulty_level}</CardDescription>
							</CardHeader>
							<CardContent>
								<Text>Objectives: {Object.keys(habit.milestones).length}</Text>
								<View className="flex flex-row justify-between">
									<Text>Skills: {Object.keys(habit.skills).length}</Text>
									<Muted>{habit.milestones.reduce((acc, curr) => acc + curr.points, 0)} points</Muted>
								</View>
							</CardContent>
						</Card>
					);
				})}
			</View>
		</SafeAreaView>
	);
}
