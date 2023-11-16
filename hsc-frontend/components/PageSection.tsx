import { Box, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import { SxPropsObject } from "@/types/mui-types";

type Props = {
	title: string;
	sx?: SxPropsObject;
} & PropsWithChildren;

export const PageSection = ({ title, children, sx = {} }: Props) => {
	return (
		<Box component="section" sx={[{}, sx]}>
			<Typography
				sx={(theme) => ({
					mb: "1rem",
					fontWeight: 700,
					fontSize: "1.1rem",
					color: theme.palette.primary.main,
				})}
				variant="h2"
			>
				{title}
			</Typography>
			{children}
		</Box>
	);
};
