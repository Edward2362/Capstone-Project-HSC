import Logo from "../public/Logo.svg";

export const diagnoseStyles = {
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		bgcolor: "primary.main",
		padding: "0 1.2rem",
		"&::after": {
			content: '""',
			position: "absolute",
			left: "50%",
			right: 0,
			bottom: "14%",
			width: 150,
			height: 150,
			color: "white",
			zIndex: "0",
			textAlign: "center",
			transform: "translate(-50%, 40%)",
			background: `url(${Logo.src})`,
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
		},
	},
	card: {
		height: "fit-content",
		bgcolor: "white",
		padding: "1.2rem",
		borderRadius: "25px",
		transition: "height 2s linear",
		position: "relative",
	},
};
