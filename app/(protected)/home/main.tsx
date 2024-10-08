import { useRouter } from "expo-router";
import { Search, Bell, BellOff, Plus, Play, CalendarPlus } from "lucide-react-native";
import { useCallback, useState } from "react";
import { View, TouchableOpacity, ScrollView, RefreshControl } from "react-native";

import { useGetUserHabits } from "@/actions/habitHooks";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { Muted, H2 } from "@/components/ui/typography";
import { type UserHabit } from "@/lib/models/habits";

export default function Home() {
	const router = useRouter();
	const { data: userHabits, isLoading, refetch } = useGetUserHabits();

	const [refreshing, setRefreshing] = useState(false);

	const handleRefetch = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	const onRefresh = useCallback(() => {
		handleRefetch();
	}, []);

	return (
		<SafeAreaView className="flex-1 items-center bg-background p-4 gap-y-4">
			<View className="flex flex-row items-center justify-between w-full">
				<H2>Active Quests</H2>
				<Button onPress={() => router.back()} variant="ghost" size="none">
					<Plus />
				</Button>
			</View>
			<Input placeholder="Search" className="w-full" icon={<Search />} />
			<ScrollView
				className="flex-1 w-full gap-y-4"
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				{isLoading || !userHabits ? (
					<Text>Loading...</Text>
				) : (
					userHabits.map((item: UserHabit) => {
						return (
							<Button
								key={item.id}
								className="w-full"
								variant="ghost"
								size="none"
								onPress={() => {
									router.push({
										pathname: "/(protected)/home/details",
										params: {
											habitId: item.id,
										},
									});
								}}
							>
								<Card className="w-full">
									<CardHeader>
										<View className="flex flex-row justify-between">
											<CardTitle>{item.habit.name}</CardTitle>
											<CardDescription>{item.habit.difficultyLevel}</CardDescription>
										</View>
										<View className="mt-4">
											<Progress value={item.progressPercentage} />
											<View className="flex flex-row justify-between mt-2">
												<CardDescription>Progress: {item.progressPercentage}%</CardDescription>
												<CardDescription>{item.status}</CardDescription>
											</View>
										</View>
									</CardHeader>
									<CardContent>
										<Text>Current Streak: {item.currentStreak}</Text>
										<Text>Next Milestone: {item.nextMilestone - item.currentStreak} days</Text>
										<Text>Next Skill: {item.nextSkillUnlock}</Text>
									</CardContent>
									<CardFooter className="flex flex-row justify-between">
										<View className="flex flex-row gap-x-2">
											{(item.status === "Not Started" || item.status === "Abandoned") && (
												<Button className="flex flex-row items-center">
													<Play />
													<Text className="ml-2">Start</Text>
												</Button>
											)}
											{item.status === "In Progress" && (
												<Button className="flex flex-row items-center">
													<CalendarPlus />
													<Muted className="ml-2">Track</Muted>
												</Button>
											)}
										</View>
										<Button
											variant="ghost"
											size="none"
											onPress={(e) => {
												e.preventDefault();
											}}
										>
											{item.notificationsEnabled ? <Bell /> : <BellOff />}
										</Button>
									</CardFooter>
								</Card>
							</Button>
						);
					})
				)}
			</ScrollView>
		</SafeAreaView>
	);
}
