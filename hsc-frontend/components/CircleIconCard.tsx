import { Box, Card, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
	icon: ReactNode;
	value?: string;
	subtitle?: string;
	noWrap?: boolean;
}

// bruh dat ten vl that
const CircleIconCard = ({ noWrap = false, ...props }: Props) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "flex-start",
				width: 1,
				alignItems: "center",
				gap: 1.5,
			}}
		>
			<Card
				sx={{
					width: "fit-content",
					aspectRatio: "1/1",
					color: "primary.main",
					borderRadius: 100,
					bgcolor: "primary.light",
					padding: 1,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexShrink: 0,
				}}
				square
			>
				{props.icon}
			</Card>
			<Box sx={{ flex: 1, minWidth: 0 }}>
				<Typography
					sx={{ fontWeight: "bold", wordWrap: "break-word" }}
					color="primary.dark"
				>
					{props.value}
				</Typography>
				<Typography
					sx={{ wordBreak: "break-all" }}
					variant="body2"
					color="gray"
					noWrap={noWrap}
				>
					{props.subtitle}
				</Typography>
			</Box>
		</Box>
	);
};

export default CircleIconCard;
