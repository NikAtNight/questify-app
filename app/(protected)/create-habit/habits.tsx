import { useRouter } from "expo-router";
import { Search, Plus } from "lucide-react-native";
import { useCallback, useState } from "react";
import { View, ScrollView, RefreshControl } from "react-native";

import { useGetHabits } from "@/actions/habitHooks";
import LoadingScreen from "@/components/loading-screen";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { H2, Muted } from "@/components/ui/typography";
import { type Habit } from "@/lib/models/habits";

export default function Habits() {
	const router = useRouter();

	const [refreshing, setRefreshing] = useState(false);

	const { data: habits, isLoading, refetch } = useGetHabits();

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
				<H2>Search for Quests</H2>
				<Button onPress={() => router.back()} variant="ghost" size="none">
					<Plus />
				</Button>
			</View>

			<Input placeholder="Search quests" className="w-full" icon={<Search />} />

			<ScrollView
				className="flex-1 w-full gap-y-4"
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				{isLoading || !habits ? (
					<LoadingScreen />
				) : (
					habits.map((habit: Habit) => {
						return (
							<Card className="w-full" key={habit.id}>
								<CardHeader>
									<View className="flex flex-row justify-between">
										<CardTitle>{habit.name}</CardTitle>
										<CardDescription>
											{habit.category[0].name}
											{habit.category.length > 1 ? ` +${habit.category.length - 1}` : ""}
										</CardDescription>
									</View>
									<CardDescription>{habit.difficultyLevel}</CardDescription>
								</CardHeader>
								<CardContent>
									<Text>Objectives: {habit.milestones.length}</Text>
									<View className="flex flex-row justify-between">
										<Text>Skills: {habit.skills.length}</Text>
										<Muted>{habit.skills.reduce((acc, curr) => acc + curr.points, 0)} points</Muted>
									</View>
								</CardContent>
								<CardFooter className="flex flex-row justify-between">
									<Button variant="secondary" className="w-[45%]">
										<Text>View Skills</Text>
									</Button>
									<Button className="w-[45%]">
										<Text>Track Quest</Text>
									</Button>
								</CardFooter>
							</Card>
						);
					})
				)}
			</ScrollView>
		</SafeAreaView>
	);
}
