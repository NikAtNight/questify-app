import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getDifficultyColor = (level: string) => {
	switch (level) {
		case "EASY":
			return "bg-green-500";
		case "MEDIUM":
			return "bg-yellow-500";
		case "HARD":
			return "bg-red-500";
		default:
			return "bg-gray-500";
	}
};

export const getStatusColor = (status: string) => {
	switch (status) {
		case "NOT_STARTED":
			return "bg-gray-500";
		case "IN_PROGRESS":
			return "bg-blue-500";
		case "COMPLETED":
			return "bg-green-500";
		case "ABANDONED":
			return "bg-red-500";
		default:
			return "bg-gray-500";
	}
};
