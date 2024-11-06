import "../global.css";
import "axiosConfig";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { PostHogProvider } from "posthog-react-native";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";

import { PortalHost } from "@/components/primitives/portal";
import { SupabaseProvider } from "@/context/supabase-provider";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<PostHogProvider
			apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY}
			options={{
				host: process.env.EXPO_PUBLIC_POSTHOG_HOST,
			}}
		>
			<QueryClientProvider client={queryClient}>
				<SupabaseProvider>
					<SafeAreaProvider>
						<GestureHandlerRootView className="flex flex-1 bg-background">
							<BottomSheetModalProvider>
								<Stack
									screenOptions={{
										headerShown: false,
									}}
								>
									<Stack.Screen name="(protected)" />
									<Stack.Screen name="(public)" />
									<Stack.Screen
										name="modal"
										options={{
											presentation: "modal",
										}}
									/>
								</Stack>
								<PortalHost />
							</BottomSheetModalProvider>
						</GestureHandlerRootView>
					</SafeAreaProvider>
				</SupabaseProvider>
			</QueryClientProvider>
		</PostHogProvider>
	);
}

LogBox.ignoreAllLogs();
