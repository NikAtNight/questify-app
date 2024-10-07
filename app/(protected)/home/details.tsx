import { useLocalSearchParams } from "expo-router";

import { SafeAreaView } from "@/components/safe-area-view";
import { H1, Muted } from "@/components/ui/typography";

const Details = () => {
	const params = useLocalSearchParams();
	// const { data: userHabit, isLoading } = useGetUserHabit(params.habitId as string);

	return (
		<SafeAreaView className="flex flex-1 bg-background p-4 gap-y-4">
			{/* <H1 className="text-center">{myHabit.habit.name}</H1> */}
			<Muted className="text-center">This is a modal screen.</Muted>
		</SafeAreaView>
	);
};

export default Details;
