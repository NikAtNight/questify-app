import { cva, type VariantProps } from "class-variance-authority";
import { View } from "react-native";

import { TextClassContext } from "./text";
import * as Slot from "../primitives/slot";
import type { SlottableViewProps } from "../primitives/types";

import { cn } from "@/lib/utils";

export const getColor = (value: string) => {
	switch (value) {
		case "EASY":
		case "COMPLETED":
			return "bg-green-500";
		case "MEDIUM":
			return "bg-yellow-500";
		case "HARD":
		case "ABANDONED":
			return "bg-red-500";
		case "IN_PROGRESS":
			return "bg-blue-500";
		default:
			return "bg-gray-500";
	}
};

const badgeVariants = cva(
	"web:inline-flex items-center rounded-full border border-border px-2.5 py-0.5 web:transition-colors web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary web:hover:opacity-80 active:opacity-80",
				secondary: "border-transparent bg-secondary web:hover:opacity-80 active:opacity-80",
				destructive: "border-transparent bg-destructive web:hover:opacity-80 active:opacity-80",
				outline: "text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const badgeTextVariants = cva("text-xs font-semibold ", {
	variants: {
		variant: {
			default: "text-primary-foreground",
			secondary: "text-secondary-foreground",
			destructive: "text-destructive-foreground",
			outline: "text-foreground",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

type BadgeProps = SlottableViewProps &
	VariantProps<typeof badgeVariants> & {
		status?: string;
	};

function Badge({ className, variant, asChild, status, ...props }: BadgeProps) {
	const Component = asChild ? Slot.View : View;
	const color = status ? getColor(status) : null;

	return (
		<TextClassContext.Provider value={badgeTextVariants({ variant })}>
			<Component className={cn(badgeVariants({ variant }), className, color)} {...props} />
		</TextClassContext.Provider>
	);
}

export { Badge, badgeTextVariants, badgeVariants };
export type { BadgeProps };
