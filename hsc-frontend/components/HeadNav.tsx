import { DisclaimerModal } from "@/components/DisclaimerModal";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { Box, IconButton, Paper } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const HeadNav = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const closeModal = () => setIsModalOpen(false);
	const openModal = () => setIsModalOpen(true);

	return (
		<>
			<Paper
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					zIndex: 999,
					bgcolor: "transparent",
				}}
				elevation={0}
			>
				<Box
					sx={{
						padding: "20px 1.2rem",
						display: "flex",
						alignItems: "center",
						color: "white",
						justifyContent: "space-between",
					}}
				>
					<IconButton
						size="small"
						color="inherit"
						LinkComponent={Link}
						href="/"
					>
						<HomeRoundedIcon fontSize="small" />
					</IconButton>
					<IconButton
						size="small"
						color="inherit"
						onClick={openModal}
					>
						<InfoRoundedIcon fontSize="small" />
					</IconButton>
				</Box>
			</Paper>

			<DisclaimerModal open={isModalOpen} handleClose={closeModal} />
		</>
	);
};

export default HeadNav;
