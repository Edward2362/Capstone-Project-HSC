import { SxPropsObject } from "@/types/mui-types";
import { Box } from "@mui/material";
import { ReactNode } from "react";

type Props = {
	sx?: SxPropsObject;
	children: ReactNode;
};

// :((
// to fill the rest of the page height
export const PageFiller = ({ sx = {}, children }: Props) => {
	return (
		<Box
			sx={[
				{
					flex: 1,
					width: "100%",
					overflow: "auto",
					pb: 7,
				},
				sx,
			]}
		>
			<Box
				sx={{
					display: "flex",
					flex: 1,
					width: "100%",
					flexDirection: "column",
					"&>*": {
						flexShrink: 0,
					},
					p: 3,
					position: "relative",
				}}
			>
				{children}
			</Box>
		</Box>
	);
};
