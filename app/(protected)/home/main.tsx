import { useRouter } from "expo-router";
import { Plus, Play, Flame, Milestone, WandSparkles, Target } from "lucide-react-native";
import { useCallback, useState } from "react";
import { View, ScrollView, RefreshControl, Alert } from "react-native";

import { useGetUserHabits, useUpdateUserHabit, useTrackUserHabit } from "@/actions/habitHooks";
import LoadingScreen from "@/components/loading-screen";
import { SafeAreaView } from "@/components/safe-area-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { Muted, H2, H4 } from "@/components/ui/typography";
import { type UserHabit } from "@/lib/models/habits";

export default function Home() {
	const router = useRouter();
	const { data: userHabits, isLoading, refetch } = useGetUserHabits();
	const { mutate: updateUserHabit } = useUpdateUserHabit();
	const { mutate: trackUserHabit } = useTrackUserHabit();

	const [refreshing, setRefreshing] = useState(false);

	const handleRefetch = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	const onRefresh = useCallback(() => {
		handleRefetch();
	}, []);

	const getDifficultyColor = (level: string) => {
		switch (level.toLowerCase()) {
			case "easy":
				return "bg-green-500";
			case "medium":
				return "bg-yellow-500";
			case "hard":
				return "bg-red-500";
			default:
				return "bg-gray-500";
		}
	};

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "not started":
				return "bg-gray-500";
			case "in progress":
				return "bg-blue-500";
			case "completed":
				return "bg-green-500";
			case "abandoned":
				return "bg-red-500";
			default:
				return "bg-gray-500";
		}
	};

	const handleStartQuest = (habitId: string) => {
		updateUserHabit(
			{ habitId, data: { status: "In Progress" } },
			{
				onSuccess: () => {
					refetch();
				},
				onError: (error) => {
					console.error("Error updating habit:", error);
				},
			},
		);
	};

	const handleTrackProgress = (habitId: string) => {
		trackUserHabit(
			{ habit: habitId },
			{
				onSuccess: () => {
					refetch();
				},
				onError: (error: any) => {
					return Alert.alert("Progress Tracked", error.message, [{ style: "cancel" }]);
				},
			},
		);
	};

	return (
		<SafeAreaView className="flex-1 items-center bg-background p-4 gap-y-4">
			<View className="flex flex-row items-center justify-between w-full">
				<H2>Active Quests</H2>
				<Button onPress={() => router.back()} variant="ghost" size="icon">
					<Plus />
				</Button>
			</View>
			<ScrollView
				className="flex-1 w-full space-y-4"
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				{isLoading || !userHabits ? (
					<LoadingScreen />
				) : (
					userHabits.map((item: UserHabit) => (
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
							<Card key={item.id} className="w-full overflow-hidden">
								<CardHeader className="pb-2">
									<View className="flex flex-row justify-between items-center">
										<H4>{item.habit.name}</H4>
										<Badge variant="outline" className={`${getStatusColor(item.status)}`}>
											<Text>{item.status}</Text>
										</Badge>
									</View>
								</CardHeader>
								<CardContent className="pt-2">
									<View className="pb-4">
										<Progress value={item.progressPercentage} className="h-2" />
										<View className="flex flex-row justify-between pt-4">
											<Muted>Progress: {item.progressPercentage}%</Muted>
											<Badge variant="secondary" className={`${getDifficultyColor(item.habit.difficultyLevel)}`}>
												<Text>{item.habit.difficultyLevel}</Text>
											</Badge>
										</View>
									</View>
									<View className="flex flex-row flex-wrap justify-between gap-y-2 pb-4">
										<View className="flex flex-row items-center gap-x-2">
											<WandSparkles size={16} className="text-purple-500" />
											<Text className="text-sm">Next: {item.nextSkillUnlock}</Text>
										</View>

										<View className="flex flex-row items-center gap-x-2">
											<Milestone size={16} className="text-blue-500" />
											<Text className="text-sm">{item.nextMilestone - item.currentStreak} days to milestone</Text>
										</View>
									</View>
									<View className="flex flex-row justify-between items-center">
										{(item.status === "Not Started" || item.status === "Abandoned") && (
											<Button
												className="flex flex-row items-center gap-x-2"
												size="sm"
												onPress={() => handleStartQuest(item.id)}
											>
												<Play />
												<Text>Start Quest</Text>
											</Button>
										)}
										{item.status === "In Progress" && (
											<Button
												className="flex flex-row items-center gap-x-2"
												size="sm"
												onPress={() => handleTrackProgress(item.habit.id)}
											>
												<Target />
												<Text>Track Progress</Text>
											</Button>
										)}
										{item.currentStreak >= 3 && (
											<View className="flex flex-row items-center gap-x-2">
												<Flame size={16} className="text-orange-500" />
												<Text className="text-sm">{item.currentStreak} day streak</Text>
											</View>
										)}
									</View>
								</CardContent>
							</Card>
						</Button>
					))
				)}
			</ScrollView>
		</SafeAreaView>
	);
}
