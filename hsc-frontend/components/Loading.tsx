import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
	return (
		<Box
			sx={{
				bgcolor: "#0b9b8a",
				height: "100vh",
				width: 1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				color: "#f6be5c",
			}}
		>
			<CircularProgress color="inherit" />
		</Box>
	);
};

export default Loading;
