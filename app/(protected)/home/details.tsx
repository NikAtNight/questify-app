import { useLocalSearchParams, useRouter } from "expo-router";
import {
	ChevronLeft,
	Trophy,
	WandSparkles,
	Sword,
	Target,
	CheckCircle2,
	RotateCcw,
	Flame,
	Goal,
	Lock,
	ShieldOff,
} from "lucide-react-native";
import moment from "moment";
import { ScrollView, View, Alert } from "react-native";

import { useGetUserHabit, useTrackUserHabit, useUpdateUserHabit } from "@/actions/habitHooks";
import LoadingScreen from "@/components/loading-screen";
import { SafeAreaView } from "@/components/safe-area-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CalendarUI from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { H2 } from "@/components/ui/typography";
import { UserHabitUpdate, STATUS_LEVELS_MAP, DIFFICULTY_LEVELS_MAP } from "@/lib/models/habits";

const Details = () => {
	const router = useRouter();
	const params = useLocalSearchParams();
	const { data: userHabit, isLoading, refetch } = useGetUserHabit(params.habitId as string);
	const { mutate: updateUserHabit } = useUpdateUserHabit();
	const { mutate: trackUserHabit } = useTrackUserHabit();

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

	const handleUpdateUserHabit = (habitId: string, data: UserHabitUpdate) => {
		updateUserHabit(
			{ habitId, data },
			{
				onSuccess: () => {
					refetch();
				},
			},
		);
	};

	return (
		<SafeAreaView className="flex flex-1 bg-background">
			{isLoading || !userHabit ? (
				<LoadingScreen />
			) : (
				<View className="flex flex-1">
					<View className="flex flex-row items-center justify-between w-full p-4 border-b border-border">
						<Button onPress={() => router.back()} variant="ghost" size="icon">
							<ChevronLeft />
						</Button>
						<H2>{userHabit.habit.name}</H2>
						<View>
							{userHabit.status === "IN_PROGRESS" && (
								<Button
									variant="ghost"
									size="icon"
									onPress={() => handleUpdateUserHabit(userHabit.id, { status: "ABANDONED" })}
								>
									<ShieldOff />
								</Button>
							)}
							{(userHabit.status === "NOT_STARTED" || userHabit.status === "ABANDONED") && (
								<Button
									variant="ghost"
									size="icon"
									onPress={() => handleUpdateUserHabit(userHabit.id, { status: "IN_PROGRESS" })}
								>
									<Sword />
								</Button>
							)}
							{userHabit.status === "COMPLETED" && (
								<Button
									variant="ghost"
									size="icon"
									onPress={() => handleUpdateUserHabit(userHabit.id, { status: "IN_PROGRESS" })}
								>
									<RotateCcw />
								</Button>
							)}
						</View>
					</View>
					<ScrollView className="flex-1 p-4">
						<Card className="mb-4">
							<CardHeader className="pb-2">
								<View className="flex flex-row items-center justify-between">
									<CardTitle>Progress</CardTitle>
									<Badge variant="secondary" status={userHabit.status} className="mb-2">
										<Text>{STATUS_LEVELS_MAP[userHabit.status]}</Text>
									</Badge>
								</View>
							</CardHeader>
							<CardContent className="gap-y-2 mt-2">
								<Progress value={userHabit.progressPercentage} className="h-2 mb-1" />
								<View className="flex flex-row justify-between items-center">
									<Text className="text-right text-sm text-muted-foreground">
										{userHabit.progressPercentage.toFixed(2)}% Complete
									</Text>
									<Badge variant="secondary" status={userHabit.habit.difficultyLevel}>
										<Text>{DIFFICULTY_LEVELS_MAP[userHabit.habit.difficultyLevel]}</Text>
									</Badge>
								</View>
							</CardContent>
						</Card>

						<Card className="mb-4">
							<CardHeader className="pb-4">
								<CardTitle>Stats</CardTitle>
							</CardHeader>
							<CardContent className="gap-y-2">
								<View className="flex flex-row justify-between items-center">
									<View className="flex flex-row items-center gap-x-2">
										<Flame className="bg-yellow-500" size={20} />
										<Text>Current Streak</Text>
									</View>
									<Text className="font-semibold">{userHabit.currentStreak}</Text>
								</View>
								<View className="flex flex-row justify-between items-center">
									<View className="flex flex-row items-center gap-x-2">
										<Goal className="bg-yellow-500" size={20} />
										<Text>Best Streak</Text>
									</View>
									<Text className="font-semibold">{userHabit.bestStreak}</Text>
								</View>

								<View className="flex flex-row justify-between items-center">
									<View className="flex flex-row items-center gap-x-2">
										<Trophy className="bg-yellow-500" size={20} />
										<Text>Total Days Completed</Text>
									</View>
									<Text className="font-semibold">{userHabit.totalDaysCompleted}</Text>
								</View>
							</CardContent>
						</Card>

						<Card className="mb-4">
							<CardHeader className="pb-4 flex flex-row items-center justify-between">
								<CardTitle>Milestones</CardTitle>
								<Text>Next Unlock in {userHabit.nextMilestone - userHabit.currentStreak} days</Text>
							</CardHeader>
							<CardContent className="gap-y-2">
								{userHabit.habit.milestones.map((milestone, i) => (
									<View key={i} className="flex flex-row justify-between items-center">
										{milestone.day > userHabit.currentStreak ? (
											<View className="flex flex-row items-center gap-x-2">
												<Lock className="text-purple-500" size={20} />
												<Text className="text-muted-foreground">{milestone.name}</Text>
											</View>
										) : (
											<View className="flex flex-row items-center gap-x-2">
												<WandSparkles className="text-purple-500" size={20} />
												<Text>{milestone.name}</Text>
											</View>
										)}
										<Text className="font-semibold">{milestone.day}</Text>
									</View>
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle>Recent Activity</CardTitle>
							</CardHeader>
							<CardContent>
								<CalendarUI logs={userHabit.habitLogs} />
							</CardContent>
						</Card>
					</ScrollView>

					<View className="p-4 border-t border-border pb-0">
						{(userHabit.status === "NOT_STARTED" || userHabit.status === "ABANDONED") && (
							<Button
								className="w-full flex flex-row items-center gap-x-2"
								onPress={() => handleUpdateUserHabit(userHabit.id, { status: "IN_PROGRESS" })}
							>
								<Sword />
								<Text>Start Quest</Text>
							</Button>
						)}
						{userHabit.status === "IN_PROGRESS" && (
							<Button
								className="w-full flex flex-row items-center gap-x-2"
								onPress={() => handleTrackProgress(userHabit.habit.id)}
							>
								<Target />
								<Text>Track Progress</Text>
							</Button>
						)}
						{userHabit.status === "COMPLETED" && (
							<Button
								className="w-full flex flex-row items-center gap-x-2"
								onPress={() => handleUpdateUserHabit(userHabit.id, { status: "IN_PROGRESS" })}
							>
								<RotateCcw />
								<Text>Restart Quest</Text>
							</Button>
						)}
					</View>
				</View>
			)}
		</SafeAreaView>
	);
};

export default Details;
