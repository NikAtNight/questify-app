import React, { useState, useCallback } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

import { theme } from "@/lib/constants";
import { HabitLog } from "@/lib/models/habits";
import { useColorScheme } from "@/lib/useColorScheme";

type CalendarUIProps = {
	logs: HabitLog[];
	handleArrowPressRight: (date: Date) => void;
	handleArrowPressLeft: (date: Date) => void;
	isLoading: boolean;
};

const CalendarUI = ({ logs, handleArrowPressRight, handleArrowPressLeft, isLoading }: CalendarUIProps) => {
	const { isDarkColorScheme } = useColorScheme();
	const [selectedValue, setSelectedValue] = useState(new Date());
	const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().split("T")[0]);

	const colors = isDarkColorScheme ? theme.dark : theme.light;

	const getNewSelectedDate = useCallback(
		(date: string, shouldAdd: boolean): Date => {
			const newMonth = new Date(date).getMonth();
			const month = shouldAdd ? newMonth + 1 : newMonth - 1;
			const newDate = new Date(selectedValue.setMonth(month));
			const newSelected = new Date(newDate.setDate(1));
			return newSelected;
		},
		[selectedValue],
	);

	const onPressArrowLeft = useCallback(
		(subtract: () => void, month: string): void => {
			const newDate = getNewSelectedDate(month, false);
			setSelectedValue(newDate);
			setCurrentMonth(newDate.toISOString().split("T")[0]);
			subtract();
			handleArrowPressLeft(newDate);
		},
		[getNewSelectedDate],
	);

	const onPressArrowRight = useCallback(
		(add: () => void, month: string): void => {
			const newDate = getNewSelectedDate(month, true);
			setSelectedValue(newDate);
			setCurrentMonth(newDate.toISOString().split("T")[0]);
			add();
			handleArrowPressRight(newDate);
		},
		[getNewSelectedDate],
	);

	return (
		<View>
			<Calendar
				hideExtraDays
				current={currentMonth}
				maxDate={new Date().toISOString().split("T")[0]}
				disableAllTouchEventsForDisabledDays
				markedDates={
					logs?.reduce(
						(acc, log) => ({
							...acc,
							[log?.createdAt?.split("T")[0] || ""]: { selected: true },
						}),
						{},
					) || {}
				}
				onPressArrowLeft={onPressArrowLeft}
				onPressArrowRight={onPressArrowRight}
				displayLoadingIndicator={isLoading}
				theme={{
					calendarBackground: "transparent",
					arrowColor: colors.foreground,
					monthTextColor: colors.foreground,
					textDisabledColor: colors.muted,
					dayTextColor: colors.foreground,
					selectedDayTextColor: colors.secondary,
					selectedDayBackgroundColor: colors.primary,
				}}
			/>
		</View>
	);
};

export default CalendarUI;
