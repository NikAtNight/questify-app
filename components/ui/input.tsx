import * as React from "react";
import { TextInput, View } from "react-native";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<
	React.ElementRef<typeof TextInput>,
	React.ComponentPropsWithoutRef<typeof TextInput> & { icon?: React.ReactNode }
>(({ className, placeholderClassName, icon, ...props }, ref) => {
	return (
		<View className="relative w-full">
			<TextInput
				ref={ref}
				className={cn(
					"web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
					props.editable === false && "opacity-50 web:cursor-not-allowed",
					icon && "pr-10", // Add padding to the right when there's an icon
					className,
				)}
				placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
				{...props}
			/>
			{icon && <View className="absolute right-3 top-1/2 -translate-y-1/2">{icon}</View>}
		</View>
	);
});

Input.displayName = "Input";

export { Input };
