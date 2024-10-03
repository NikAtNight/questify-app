import "../global.css";
import "axiosConfig";

import { Stack } from "expo-router";
import { PostHogProvider } from "posthog-react-native";
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
			options={{ host: process.env.EXPO_PUBLIC_POSTHOG_HOST }}
		>
			<QueryClientProvider client={queryClient}>
				<SupabaseProvider>
					<SafeAreaProvider>
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
					</SafeAreaProvider>
				</SupabaseProvider>
			</QueryClientProvider>
		</PostHogProvider>
	);
}
