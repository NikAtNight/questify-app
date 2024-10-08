import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Dot, Trophy, TrendingUp, WandSparkles } from "lucide-react-native";
import { View, ScrollView } from "react-native";

import { useGetUserHabit } from "@/actions/habitHooks";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { H2, H4 } from "@/components/ui/typography";

const Details = () => {
	const router = useRouter();
	const params = useLocalSearchParams();
	const { data: userHabit, isLoading } = useGetUserHabit(params.habitId as string);

	return (
		<SafeAreaView className="flex flex-1 bg-background p-4">
			{isLoading || !userHabit ? (
				<Text>Loading...</Text>
			) : (
				<View>
					<View className="flex flex-row items-center justify-between w-full">
						{/* Invisible button to evenly space the header */}
						<Button onPress={() => router.back()} variant="ghost" size="none">
							<ChevronLeft />
						</Button>
						<H2>{userHabit.habit.name}</H2>
						<Button className="invisible" variant="ghost" size="none">
							<Dot />
						</Button>
					</View>
					<ScrollView className="w-full mt-4">
						<View className="flex flex-row items-center justify-between w-full">
							<Text>Status</Text>
							<Text>{userHabit.status}</Text>
						</View>

						<Progress value={userHabit.progressPercentage} className="mt-4" />

						<View className="flex-row-reverse w-full mt-2">
							<Text>{userHabit.progressPercentage}% Complete</Text>
						</View>

						<View className="flex flex-row justify-between items-center bg-gray-900 p-4 rounded-lg mt-4">
							<View>
								<H4>Current Streak</H4>
								<Text>{userHabit.currentStreak} days</Text>
							</View>
							<View>
								<H4>Best Streak</H4>
								<Text>{userHabit.bestStreak} days</Text>
							</View>
						</View>

						<View className="mt-4">
							<View className="flex flex-row justify-between items-center w-full">
								<View className="flex flex-row items-center gap-x-2">
									<Trophy color="rgb(234 179 8)" />
									<Text className="ml-2">Total Days Completed</Text>
								</View>
								<Text>{userHabit.totalDaysCompleted}</Text>
							</View>

							<View className="flex flex-row justify-between items-center w-full mt-2">
								<View className="flex flex-row items-center gap-x-2">
									<TrendingUp color="rgb(34 197 94)" />
									<Text className="ml-2">Next Milestone</Text>
								</View>
								<Text>{userHabit.nextMilestone}</Text>
							</View>

							<View className="flex flex-row justify-between items-center w-full mt-2">
								<View className="flex flex-row items-center gap-x-2">
									<WandSparkles />
									<Text className="ml-2">Next Skill Unlock</Text>
								</View>
								<Text>{userHabit.nextSkillUnlock}</Text>
							</View>
						</View>

						<H4 className="mt-4">Recent Activity</H4>

						<View className="mt-2">
							{userHabit.habitLogs && userHabit.habitLogs.length > 0 ? (
								userHabit.habitLogs.map((item, i) => (
									<View key={i} className="flex flex-row justify-between items-center w-full">
										<Text> Completed</Text>
										<Text>{item.createdAt}</Text>
									</View>
								))
							) : (
								<Text>No habit logs available</Text>
							)}
						</View>
					</ScrollView>
				</View>
			)}
		</SafeAreaView>
	);
};

export default Details;
