import { useRouter } from "expo-router";
import { Search, Bell, BellOff, Dot, Plus } from "lucide-react-native";
import { useCallback, useState } from "react";
import { View, TouchableOpacity, ScrollView, RefreshControl } from "react-native";

import { useGetUserHabits } from "@/actions/habitHooks";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

	if (isLoading || !userHabits) {
		return <Text>Loading...</Text>;
	}

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
			<ScrollView
				className="flex-1 w-full gap-y-4"
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				{userHabits.map((item: UserHabit) => {
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
										<CardDescription>{item.currentStreak}</CardDescription>
									</View>
									<View className="flex flex-row justify-between mt-2">
										<CardDescription>{item.status}</CardDescription>
										<CardDescription>{item.habit.difficultyLevel}</CardDescription>
									</View>
								</CardHeader>
								<CardContent>
									<Text>Next Milestone: {item.nextMilestone - item.currentStreak} days</Text>
									<Text>Next Skill: {item.nextSkillUnlock}</Text>
								</CardContent>
								<CardFooter className="flex flex-row justify-between">
									<Muted>{item.progressPercentage}%</Muted>
									<TouchableOpacity
										onPress={(e) => {
											e.preventDefault();
										}}
									>
										{item.notificationsEnabled ? <Bell /> : <BellOff />}
									</TouchableOpacity>
								</CardFooter>
							</Card>
						</Button>
					);
				})}
			</ScrollView>
		</SafeAreaView>
	);
}
