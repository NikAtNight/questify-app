import { useRouter } from "expo-router";
import { Search, Plus, Star, ChevronRight } from "lucide-react-native";
import { useCallback, useState } from "react";
import { View, ScrollView, RefreshControl, TouchableOpacity } from "react-native";

import { useGetHabits } from "@/actions/habitHooks";
import LoadingScreen from "@/components/loading-screen";
import { SafeAreaView } from "@/components/safe-area-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { H2, H4, Muted } from "@/components/ui/typography";
import { DIFFICULTY_LEVELS_MAP, type Habit } from "@/lib/models/habits";
import { getDifficultyColor } from "@/lib/utils";

export default function AvailableQuests() {
	const router = useRouter();
	const [refreshing, setRefreshing] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const { data: habits, isLoading, refetch } = useGetHabits();

	const handleRefetch = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	const onRefresh = useCallback(() => {
		handleRefetch();
	}, []);

	const filteredHabits = habits?.filter((habit: Habit) => habit.name.toLowerCase().includes(searchQuery.toLowerCase()));

	return (
		<SafeAreaView className="flex-1 bg-background p-4">
			<View className="flex-row items-center justify-between mb-4">
				<H2>Available Quests</H2>
				<Button
					// onPress={() => router.push("/create-quest")}
					variant="ghost"
					size="icon"
				>
					<Plus />
				</Button>
			</View>

			<View className="mb-4">
				<Input placeholder="Search for quests" value={searchQuery} onChangeText={setSearchQuery} icon={<Search />} />
			</View>

			<ScrollView className="flex-1" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				{isLoading ? (
					<LoadingScreen />
				) : (
					filteredHabits?.map((habit: Habit) => (
						<Card key={habit.id} className="mb-4">
							<CardHeader>
								<View className="flex-row justify-between items-center">
									<H4>{habit.name}</H4>
									<Badge variant="secondary" className={getDifficultyColor(habit.difficultyLevel)}>
										<Text>{DIFFICULTY_LEVELS_MAP[habit.difficultyLevel]}</Text>
									</Badge>
								</View>
								<Muted>
									{habit.category[0].name}
									{habit.category.length > 1 ? ` + ${habit.category.length - 1}` : ""}
								</Muted>
							</CardHeader>
							<CardContent>
								<View className="flex-row justify-between items-center mb-2">
									<View className="flex-row items-center gap-x-2">
										<Star />
										<Text>{habit.milestones.reduce((acc, curr) => acc + curr.points, 0)} points</Text>
									</View>
									<Text>{habit.milestones.length} milestones</Text>
								</View>
							</CardContent>
							<CardFooter className="flex-row justify-between">
								<Button
									variant="outline"
									className="flex-1 mr-2"
									size="sm"
								// onPress={() => router.push(`/quest-details/${habit.id}`)}
								>
									<Text>View Details</Text>
								</Button>
								<Button
									className="flex-1 ml-2"
									size="sm"
								// onPress={() => router.push(`/track-quest/${habit.id}`)}
								>
									<Text>Track Quest</Text>
								</Button>
							</CardFooter>
						</Card>
					))
				)}
			</ScrollView>
		</SafeAreaView>
	);
}
