import { BottomSheetView, BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef } from "react";

import { theme } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";

interface SheetProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	snapPoints?: string[];
}

const Sheet = ({ isOpen, onClose, children, snapPoints = ["25%"] }: SheetProps) => {
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const { colorScheme } = useColorScheme();
	const colors = colorScheme === "dark" ? theme.dark : theme.light;

	useEffect(() => {
		if (isOpen) {
			bottomSheetRef.current?.present();
		}
	}, [isOpen]);

	const handleDismiss = useCallback(() => {
		bottomSheetRef.current?.dismiss();
		onClose();
	}, [onClose]);

	const renderBackdrop = useCallback(
		(props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />,
		[],
	);

	if (!isOpen) return null;

	return (
		<BottomSheetModal
			ref={bottomSheetRef}
			handleStyle={{ backgroundColor: colors.background }}
			handleIndicatorStyle={{ backgroundColor: colors.border }}
			snapPoints={snapPoints}
			onDismiss={handleDismiss}
			maxDynamicContentSize={400}
			overDragResistanceFactor={0}
			enablePanDownToClose
			backdropComponent={renderBackdrop}
			enableHandlePanningGesture
			enableContentPanningGesture
		>
			<BottomSheetView className="flex flex-1 bg-background p-4">{children}</BottomSheetView>
		</BottomSheetModal>
	);
};

export default Sheet;
