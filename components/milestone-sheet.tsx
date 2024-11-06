import { WandSparkles } from "lucide-react-native";
import { View } from "react-native";

import { useGetHabitMilestones } from "@/actions/milestonesHooks";
import LoadingScreen from "@/components/loading-screen";
import Sheet from "@/components/ui/sheet";
import { Text } from "@/components/ui/text";
import { H2 } from "@/components/ui/typography";

const MilestoneContent = ({ habitId }: { habitId: string }) => {
	const { data: milestones, isLoading } = useGetHabitMilestones(habitId);

	if (isLoading || !milestones) {
		return <LoadingScreen />;
	}

	return (
		<View className="flex flex-1">
			<View className="flex flex-row items-center justify-between w-full">
				<H2>Milestones</H2>
			</View>
			{milestones.map((milestone, i) => (
				<View key={i} className="flex flex-row justify-between items-center">
					<View className="flex flex-row items-center gap-x-2 ">
						<WandSparkles className="text-purple-500" size={20} />
						<Text>{milestone.name}</Text>
					</View>
					<Text className="font-semibold">{milestone.day}</Text>
				</View>
			))}
		</View>
	);
};

const MilestoneSheet = ({ onClose, habitId }: { onClose: () => void; habitId: null | string }) => {
	return (
		<Sheet isOpen={!!habitId} onClose={onClose}>
			{habitId && <MilestoneContent habitId={habitId} />}
		</Sheet>
	);
};

export default MilestoneSheet;
