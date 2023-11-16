import { SxPropsObject } from "@/types/mui-types";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

export type PageHeaderProps = {
	startComponent?: ReactNode;
	endComponent?: ReactNode;
	title?: string;
	containerSx?: SxPropsObject;
};

export const PageHeader = ({
	startComponent,
	endComponent,
	title,
	containerSx = {},
}: PageHeaderProps) => {
	return (
		<Box
			sx={[
				{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "1rem",
					color: "white",
				},
				containerSx,
			]}
		>
			{startComponent || <Box sx={{ width: "2rem" }}></Box>}
			{title ? (
				<Typography
					sx={{
						fontWeight: "600",
						fontSize: "1.1rem",
						px: 1,
					}}
					noWrap={true}
					variant="h1"
				>
					{title}
				</Typography>
			) : null}
			{endComponent || <Box sx={{ width: "2rem" }}></Box>}
		</Box>
	);
};
