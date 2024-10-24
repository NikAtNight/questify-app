"use client";

import { useLocalSearchParams, useRouter } from "expo-router";
import {
	ChevronLeft,
	Dot,
	TrendingUp,
	Trophy,
	WandSparkles,
	Play,
	Pause,
	CalendarPlus,
	CheckCircle2,
} from "lucide-react-native";
import moment from "moment";
import { ScrollView, View } from "react-native";

import { useGetUserHabit } from "@/actions/habitHooks";
import LoadingScreen from "@/components/loading-screen";
import { SafeAreaView } from "@/components/safe-area-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { H2, H3 } from "@/components/ui/typography";

const Details = () => {
	const router = useRouter();
	const params = useLocalSearchParams();
	const { data: userHabit, isLoading } = useGetUserHabit(params.habitId as string);

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

	return (
		<SafeAreaView className="flex flex-1 bg-background">
			{isLoading || !userHabit ? (
				<LoadingScreen />
			) : (
				<View className="flex flex-1">
					<View className="flex flex-row items-center justify-between w-full p-4 border-b border-border">
						<Button onPress={() => router.back()} variant="ghost" size="icon">
							<ChevronLeft className="h-6 w-6" />
						</Button>
						<H2>{userHabit.habit.name}</H2>
						<Button className="invisible" variant="ghost" size="icon">
							<Dot className="h-6 w-6" />
						</Button>
					</View>
					<ScrollView className="flex-1 p-4">
						<Card className="mb-4">
							<CardHeader className="pb-2">
								<View className="flex flex-row items-center justify-between">
									<CardTitle>Progress</CardTitle>
									<Badge variant="secondary" className={`mb-2 ${getStatusColor(userHabit.status)}`}>
										<Text>{userHabit.status}</Text>
									</Badge>
								</View>
							</CardHeader>
							<CardContent className="gap-y-2 mt-2">
								<Progress value={userHabit.progressPercentage} className="h-2 mb-1" />
								<Text className="text-right text-sm text-muted-foreground">
									{userHabit.progressPercentage}% Complete
								</Text>
							</CardContent>
						</Card>

						<Card className="mb-4">
							<CardContent className="flex flex-row justify-around items-center py-4">
								<View className="items-center">
									<H3>{userHabit.currentStreak}</H3>
									<Text className="text-sm text-muted-foreground">Current Streak</Text>
								</View>
								<Separator orientation="vertical" className="h-10" />
								<View className="items-center">
									<H3>{userHabit.bestStreak}</H3>
									<Text className="text-sm text-muted-foreground">Best Streak</Text>
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
										<Trophy className="bg-yellow-500" size={20} />
										<Text>Total Days Completed</Text>
									</View>
									<Text className="font-semibold">{userHabit.totalDaysCompleted}</Text>
								</View>
								<View className="flex flex-row justify-between items-center">
									<View className="flex flex-row items-center gap-x-2">
										<TrendingUp className="text-green-500" size={20} />
										<Text>Next Milestone</Text>
									</View>
									<Text className="font-semibold">{userHabit.nextMilestone}</Text>
								</View>
								<View className="flex flex-row justify-between items-center">
									<View className="flex flex-row items-center gap-x-2">
										<WandSparkles className="text-purple-500" size={20} />
										<Text>Next Skill Unlock</Text>
									</View>
									<Text className="font-semibold">{userHabit.nextSkillUnlock}</Text>
								</View>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle>Recent Activity</CardTitle>
							</CardHeader>
							<CardContent>
								{userHabit.habitLogs && userHabit.habitLogs.length > 0 ? (
									userHabit.habitLogs.map((item, i) => (
										<View key={i} className="flex flex-row justify-between items-center py-2">
											<Text>{moment(item.createdAt).format("MMM DD, YYYY")}</Text>
											<View className="flex flex-row items-center gap-x-2">
												<CheckCircle2 className="text-green-500" size={20} />
												<Text className="text-sm text-muted-foreground">Completed</Text>
											</View>
										</View>
									))
								) : (
									<Text className="text-center text-muted-foreground">No habit logs available</Text>
								)}
							</CardContent>
						</Card>
					</ScrollView>

					<View className="p-4 border-t border-border pb-0">
						{(userHabit.status === "Not Started" || userHabit.status === "Abandoned") && (
							<Button className="w-full flex flex-row items-center gap-x-2">
								<Play />
								<Text>Start Quest</Text>
							</Button>
						)}
						{userHabit.status === "In Progress" && (
							<View className="flex flex-col gap-y-2">
								<Button className="w-full flex flex-row items-center gap-x-2" variant="secondary">
									<Pause />
									<Text>Pause Quest</Text>
								</Button>
								<Button className="w-full flex flex-row items-center gap-x-2">
									<CalendarPlus />
									<Text>Track Progress</Text>
								</Button>
							</View>
						)}
					</View>
				</View>
			)}
		</SafeAreaView>
	);
};

export default Details;
