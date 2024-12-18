import { useRouter } from "expo-router";
import { ScrollText, Sword, Flame, Milestone, Target, FlameKindling } from "lucide-react-native";
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
import { type UserHabit, STATUS_LEVELS_MAP, DIFFICULTY_LEVELS_MAP } from "@/lib/models/habits";

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

	const handleStartQuest = (habitId: string) => {
		updateUserHabit(
			{ habitId, data: { status: "IN_PROGRESS" } },
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

	const renderContent = () => {
		if (isLoading || !userHabits) {
			return <LoadingScreen />;
		}

		if (userHabits.length === 0) {
			return (
				<ScrollView
					contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				>
					<View className="items-center justify-center gap-y-4">
						<FlameKindling size={100} color="gray" style={{ opacity: 0.5 }} />
						<Text>No active quests</Text>
					</View>
				</ScrollView>
			);
		}

		return (
			<ScrollView
				className="flex-1 w-full space-y-4"
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				{userHabits.map((item: UserHabit) => (
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
						<Card key={item.id} className="w-full">
							<CardHeader className="pb-2">
								<View className="flex flex-row justify-between items-center">
									<H4>{item.habit.name}</H4>
									<Badge variant="secondary" status={item.status}>
										<Text>{STATUS_LEVELS_MAP[item.status]}</Text>
									</Badge>
								</View>
							</CardHeader>
							<CardContent className="pt-2">
								<View className="pb-4">
									<Progress value={item.progressPercentage} className="h-2" />
									<View className="flex flex-row justify-between pt-4">
										<Muted>Progress: {item.progressPercentage.toFixed(2)}%</Muted>
										<Badge variant="secondary" status={item.habit.difficultyLevel}>
											<Text>{DIFFICULTY_LEVELS_MAP[item.habit.difficultyLevel]}</Text>
										</Badge>
									</View>
								</View>
								<View className="flex flex-coljustify-between gap-y-2 pb-4">
									<View className="flex flex-row items-center gap-x-2">
										<Milestone size={16} className="text-blue-500" />
										<Text className="text-sm">{item.nextMilestone - item.currentStreak} days to milestone</Text>
									</View>

									{item.currentStreak >= 3 && (
										<View className="flex flex-row items-center gap-x-2">
											<Flame size={16} className="text-orange-500" />
											<Text className="text-sm">{item.currentStreak} day streak</Text>
										</View>
									)}
								</View>
								<View className="flex flex-row-reverse justify-between items-center">
									{(item.status === "NOT_STARTED" || item.status === "ABANDONED") && (
										<Button
											className="flex flex-row items-center gap-x-2"
											size="sm"
											onPress={() => handleStartQuest(item.id)}
										>
											<Sword />
											<Text>Start Quest</Text>
										</Button>
									)}
									{item.status === "IN_PROGRESS" && (
										<Button
											className="flex flex-row items-center gap-x-2"
											size="sm"
											onPress={() => handleTrackProgress(item.habit.id)}
										>
											<Target />
											<Text>Track Progress</Text>
										</Button>
									)}
								</View>
							</CardContent>
						</Card>
					</Button>
				))}
			</ScrollView>
		);
	};

	return (
		<SafeAreaView className="flex-1 items-center bg-background p-4 gap-y-4">
			<View className="flex flex-row items-center justify-between w-full">
				<H2>Active Quests</H2>
				<Button onPress={() => router.push("/(protected)/home/archives")} variant="ghost" size="icon">
					<ScrollText />
				</Button>
			</View>
			{renderContent()}
		</SafeAreaView>
	);
}
