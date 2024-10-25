import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getDifficultyColor = (level: string) => {
	switch (level.toLowerCase()) {
		case "easy":
			return "bg-green-500";
		case "medium":
			return "bg-yellow-500";
		case "hard":
			return "bg-red-500";
		default:
			return "bg-gray-500";
	}
};

export const getStatusColor = (status: string) => {
	switch (status.toLowerCase()) {
		case "not_started":
			return "bg-gray-500";
		case "in_progress":
			return "bg-blue-500";
		case "completed":
			return "bg-green-500";
		case "abandoned":
			return "bg-red-500";
		default:
			return "bg-gray-500";
	}
};
