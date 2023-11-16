import { PageFiller } from "@/components/PageFiller";
import { SxPropsObject, SxPropsStatic } from "@/types/mui-types";
import { ReactNode } from "react";

type Props = {
	sx?: SxPropsObject;
	children: ReactNode;
};

export const pageBodyStyles = {
	box: {
		display: "flex",
		flexDirection: "column",
		// p: 3,
		// pt: 4,
		borderRadius: "1rem 1rem 0 0",
		bgcolor: "white",
		msOverflowStyle: "none",
		scrollbarWidth: "none",
		"&::-webkit-scrollbar": {
			display: "none",
		},
	} as SxPropsStatic,
} as const;

export const PageBody = ({ sx = {}, children }: Props) => {
	return (
		<PageFiller sx={{ ...pageBodyStyles.box, ...sx }}>
			{children}
		</PageFiller>
	);
};
