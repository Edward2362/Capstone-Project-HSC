import Logo from "../public/Logo.svg";

export const searchStyles = {
	container: {
		position: "relative",
		display: "flex",
		flexDirection: "column",
		overflow: "hidden",
		bgcolor: "primary.main",
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
	searchContainer: {
		border: "solid 8px white",
		position: "absolute",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		margin: "1.2rem",
		color: "primary.dark",
		bgcolor: "white",
		padding: 1,
		borderRadius: "1rem",
		top: 0,
		left: 0,
		right: 0,
		zIndex: 1,
		height: "fit-content",
		transition: "height 2s",
	},
	searchBar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: 1,
	},
	suggestionsBody: {
		bgcolor: "white",
		overflowY: "auto",
		overflowX: "hidden",
		width: 1,
		height: 1,
	},
	suggestionFound: { padding: 0, height: "fit-content" },
	searchBarStyle: {
		padding: 1,
		bgcolor: "primary.light",
		borderRadius: "1rem",
	},
	suggestion: {
		display: "block",
		width: 1,
		padding: 1,
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		overflow: "hidden",
		mb: "0.5rem",
		borderRadius: 2,
		"&:hover": {
			bgcolor: "primary.light",
		},
	},
};
