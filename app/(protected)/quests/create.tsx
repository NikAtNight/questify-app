import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as z from "zod";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput, FormSelect } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { H3 } from "@/components/ui/typography";

const formSchema = z.object({
	label: z.string().min(1, "Please enter at least 1 character."),
	url: z.string().min(1, "Please enter at least 1 character."),
	method: z.string().min(1, "Please enter at least 1 character."),
	body: z.string().min(1, "Please enter at least 1 character."),
	headers: z.string().min(1, "Please enter at least 1 character."),
	limit: z.number().min(1, "Please enter at least 1 character.").nullable(),
	time: z.number().min(1, "Please enter at least 1 character.").nullable(),
	steps: z
		.array(
			z.object({
				limit: z.number().min(1, "Please enter at least 1 character."),
				time: z.number().min(1, "Please enter at least 1 character."),
			}),
		)
		.nullable(),
});

export default function CreateExisting() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			label: "",
			url: "",
			method: "",
			body: "",
			headers: "",
			limit: null,
			time: null,
			steps: null,
		},
	});

	return (
		<SafeAreaView className="flex-1 items-center bg-background p-4 gap-y-4">
			<View className="flex-row items-center justify-between w-full">
				<Button className="w-[45%]">
					<Text>Create</Text>
				</Button>
				<Button className="w-[45%]">
					<Text>Create</Text>
				</Button>
			</View>
			<View className="flex-1 items-center justify-between w-full">
				<Form {...form}>
					<View className="gap-4 w-full">
						<FormField
							control={form.control}
							name="url"
							render={({ field }) => (
								<FormInput
									placeholder="https://example.com/api/v1/endpoint"
									autoCapitalize="none"
									autoComplete="url"
									autoCorrect={false}
									keyboardType="url"
									className="w-full"
									{...field}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name="method"
							render={({ field }) => (
								<FormSelect
									defaultValue={{ label: "GET", value: "GET" }}
									autoCapitalize="none"
									autoComplete="method"
									autoCorrect={false}
									keyboardType="method"
									options={[
										{ label: "GET", value: "GET" },
										{ label: "POST", value: "POST" },
										{ label: "PUT", value: "PUT" },
										{ label: "PATCH", value: "PATCH" },
										{ label: "DELETE", value: "DELETE" },
									]}
									{...field}
								/>
							)}
						/>
					</View>
				</Form>
				<Button className="w-full">
					<Text>Create</Text>
				</Button>
			</View>
		</SafeAreaView>
	);
}
