import Logo from "../public/Logo.svg";

export const forgotpwStyles = {
	container: {
		overflow: "hidden",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		bgcolor: "primary.main",
	},
	header: {
		height: 0.65,
		width: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontWeight: "bold",
		"&::after": {
			content: '""',
			position: "absolute",
			left: "50%",
			right: 0,
			bottom: "34%",
			width: 150,
			height: 150,
			color: "white",
			zIndex: 1,
			textAlign: "center",
			transform: "translateX(-50%)",
			background: `url(${Logo.src})`,
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
		},
	},
	title: {
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		color: "white",
		borderRadius: 1,
	},
	body: {
		bgcolor: "white",
		width: 1,
		height: 0.35,
		zIndex: 2,
		borderRadius: "25px 25px 0 0",
		padding: "55px 1.2rem",
		boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 12px",
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		position: "relative",
	},
	my25: {
		my: 2.5,
	},
	noti: {
		width: 1,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
};
