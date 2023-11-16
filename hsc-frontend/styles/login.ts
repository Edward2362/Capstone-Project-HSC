export const loginStyles = {
	container: {
		overflowY: "auto",
		overflowX: "hidden",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		bgcolor: "primary.main",
		position: "relative",
	},
	webName: { width: 1, textAlign: "center", color: "white" },
	header: {
		height: 0.35,
		zIndex: 1,
		width: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		position: "relative",
		bgcolor: "primary.main",
	},
	logo: { width: 1, flexGrow: 0.5, color: "white" },
	body: {
		zIndex: 1,
		borderRadius: "25px 25px 0 0",
		height: "auto",
		flexGrow: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: 1,
		bgcolor: "white",
		padding: "0 1.2rem",
		pt: "40px",
		boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 12px",
	},
	title: {
		color: "primary.main",
		width: 1,
		textAlign: "center",
		fontWeight: "bold",
	},
	my25: {
		my: 2.5,
	},
	link: {
		color: "primary.main",
		fontWeight: "bold",
	},
};