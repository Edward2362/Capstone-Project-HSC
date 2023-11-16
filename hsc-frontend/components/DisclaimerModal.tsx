import {
	Box,
	Button,
	ButtonGroup,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useId, useState } from "react";
import MemberCard from "./MemberCard";

type Props = {
	open: boolean;
	handleClose: () => void;
};

const members = [
	{
		name: "Nguyen Anh Tuan",
		avatar: "/Tuan_one.jpeg",
		roles: ["Backend", "Cloud management"],
		email: "s3818169@rmit.edu.vn",
	},
	{
		name: "Nguyen Anh Tuan",
		avatar: "/Tuan_two.jpg",
		roles: ["Backend", "Development"],
		email: "s3817907@rmit.edu.vn",
	},
	{
		name: "Nguyen The Minh",
		avatar: "/Minh.jpg",
		roles: ["Frontend", "Data preparation"],
		email: "s3878434@rmit.edu.vn",
	},
	{
		name: "Nguyen Vinh Quang",
		avatar: "/Quang.jpg",
		roles: ["Frontend", "AI"],
		email: "s3817788@rmit.edu.vn",
	},
];

export const DisclaimerModal = ({ open, handleClose }: Props) => {
	const titleId = useId();
	const descId = useId();

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
	const [isShowDisclaimer, setIsShowDisclaimer] = useState(true);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullScreen={fullScreen}
			aria-labelledby={titleId}
			aria-describedby={descId}
			sx={{
				maxWidth: "var(--screen-mobile-width)",
				mx: "auto",
			}}
		>
			<DialogTitle id={titleId}>
				<ButtonGroup
					sx={{ width: 1 }}
					aria-label="Disabled elevation buttons"
				>
					<Button fullWidth onClick={() => setIsShowDisclaimer(true)}>
						Disclaimer
					</Button>
					<Button
						fullWidth
						onClick={() => setIsShowDisclaimer(false)}
					>
						About us
					</Button>
				</ButtonGroup>
			</DialogTitle>
			<DialogContent dividers>
				{isShowDisclaimer ? (
					<>
						<DialogContentText id={descId}>
							This health symptom checker is designed for
							educational purposes only and should not be used in
							real situations. The disease checker within the app
							does not guarantee high accuracy and is not intended
							to provide medical advice or diagnoses. It is
							crucial to consult with a qualified healthcare
							professional for any health concerns or medical
							decisions. By using this app, you acknowledge that
							it does not establish a doctor-patient relationship
							and that the app developers are not liable for any
							damages resulting from its use. If you experience a
							medical emergency, please seek immediate assistance
							from emergency services or a healthcare facility.
							Remember, your health is paramount, and this app is
							not a substitute for professional medical advice.
						</DialogContentText>
					</>
				) : (
					<>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Box
								component="img"
								src="/RMIT.png"
								alt="RMIT logo"
								sx={{ width: 0.35 }}
							/>
							<Box
								component="img"
								src="/nfq-asia.png"
								alt="RMIT logo"
								sx={{ width: 0.35 }}
							/>
						</Box>
						<Divider sx={{ m: "1rem" }} />
						<Typography
							variant="h5"
							color="primary.main"
							sx={{ textAlign: "center", mb: "1rem" }}
						>
							Capstone project 2023
						</Typography>
						<DialogContentText
							id={descId}
							sx={{
								textAlign: "justify",
								textJustify: "inter-word",
							}}
						>
							At
							<Box component="span" color="primary.main">
								{" "}
								RMIT
							</Box>
							, our team of four is driven by a mission to
							revolutionize healthcare accessibility. In
							collaboration with
							<Box component="span" color="primary.main">
								{" "}
								NFQ
							</Box>
							, we&#39;re developing an AI-powered platform that
							allows users to diagnose diseases from home. Our
							goal is to support individuals who lack easy access
							to medical services or have busy schedules, enabling
							them to make informed healthcare decisions. With
							innovation at our core, we&#39;re committed to
							enhancing healthcare equity and improving lives.
						</DialogContentText>
						<Divider sx={{ m: "1rem" }} />
						<Typography
							variant="h5"
							color="primary.main"
							sx={{ textAlign: "center", mb: "1rem" }}
						>
							Team members
						</Typography>
						<Box
							sx={{
								width: 1,
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							{members.map((member, index) => (
								<MemberCard key={index} member={member} />
							))}
						</Box>
					</>
				)}
			</DialogContent>
			<DialogActions sx={{ px: 3, py: 2 }}>
				<Button autoFocus onClick={handleClose} fullWidth={false}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
