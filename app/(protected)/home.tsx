import { useRouter } from "expo-router";
import { Search, Bell, BellOff, Dot, Plus } from "lucide-react-native";
import { View, TouchableOpacity } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Muted, H2 } from "@/components/ui/typography";
import { type Habit } from "@/lib/models/habits";
import { type UserHabit } from "@/lib/models/user";
import habitData from "@/test_habit_data.json";
import userHabitData from "@/test_user_habit_data.json";

export default function Home() {
	const router = useRouter();

	const myHabits: UserHabit[] = userHabitData as UserHabit[];

	return (
		<SafeAreaView className="flex-1 items-center bg-background p-4 gap-y-4">
			<View className="flex flex-row items-center justify-between w-full">
				{/* Invisible button to evenly space the header */}
				<Button className="invisible" variant="ghost" size="none">
					<Dot />
				</Button>
				<H2>Active Quests</H2>
				<Button onPress={() => router.back()} variant="ghost" size="none">
					<Plus />
				</Button>
			</View>
			<Input placeholder="Search" className="w-full" icon={<Search />} />
			{myHabits.map((item) => {
				const habit: Habit = habitData.find((habit) => habit.id === item.habit) as Habit;

				return (
					<Button
						key={item.id}
						className="w-full"
						variant="ghost"
						size="none"
						onPress={() => {
							router.push("/modal");
						}}
					>
						<Card className="w-full">
							<CardHeader>
								<View className="flex flex-row justify-between">
									<CardTitle>{habit.name}</CardTitle>
									<CardDescription>{item.current_streak}</CardDescription>
								</View>
								<View className="flex flex-row justify-between mt-2">
									<CardDescription>{item.status}</CardDescription>
									<CardDescription>{habit.difficulty_level}</CardDescription>
								</View>
							</CardHeader>
							<CardContent>
								<Text>Next Milestone: {item.next_milestone - item.current_streak} days</Text>
								<Text>Next Skill: {item.next_skill_unlock}</Text>
							</CardContent>
							<CardFooter className="flex flex-row justify-between">
								<Muted>{item.progress_percentage}%</Muted>
								<TouchableOpacity
									onPress={(e) => {
										e.preventDefault();
									}}
								>
									{item.notifications_enabled ? <Bell /> : <BellOff />}
								</TouchableOpacity>
							</CardFooter>
						</Card>
					</Button>
				);
			})}
		</SafeAreaView>
	);
}
