import React from "react";
import { View, Image, ScrollView } from "react-native";

import { Text } from "@/components/ui/text";
import { H3 } from "@/components/ui/typography";
import { type User } from "@/lib/user";

interface ProfileProps {
	user: User;
}

const Profile = (props: ProfileProps) => {
	const { user } = props;

	return (
		<ScrollView className="bg-background">
			<View className="flex-1 items-center justify-center p-5">
				<Image source={{ uri: "https://i.pravatar.cc/150?img=68" }} className="w-[120px] h-[120px] m-2 rounded-full" />
				<H3>
					{user.firstName} {user.lastName}
				</H3>
				<Text>Dog lover and professional walker</Text>
			</View>

			<View className="flex-1 justify-around flex-row mt-5 p-5 pt-0">
				<View className="items-center">
					<Text>152</Text>
					<Text>Walks</Text>
				</View>
				<View className="items-center">
					<Text>28</Text>
					<Text>Dogs</Text>
				</View>
				<View className="items-center">
					<Text>4.9</Text>
					<Text>Rating</Text>
				</View>
			</View>
		</ScrollView>
	);
};

export default Profile;
