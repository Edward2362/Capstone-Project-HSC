import { primaryFont } from "@/utils/fonts";
import { createTheme, ThemeOptions } from "@mui/material/styles";

const theme: ThemeOptions = createTheme({
	components: {
		MuiTextField: {
			defaultProps: {
				variant: "outlined",
				fullWidth: true,
				size: "small",
			},
		},
		MuiButton: {
			defaultProps: {
				variant: "contained",
				color: "secondary",
				size: "medium",
				disableElevation: true,
				fullWidth: true,
			},
		},
		MuiIconButton: {
			defaultProps: {
				size: "small",
				color: "inherit",
			},
		},
		MuiSvgIcon: {
			defaultProps: {
				fontSize: "small",
			},
		},
	},
	shape: {
		borderRadius: 4,
	},
	typography: {
		fontFamily: [
			primaryFont.style.fontFamily,
			"system-ui",
			"sans-serif",
		].join(", "),
		button: {
			fontWeight: 600,
		},
	},
	palette: {
		background: {
			default: "#fff",
		},
		primary: {
			main: "#0b9b8a",
			light: "#e7fdfb",
		},
		secondary: {
			main: "#f6be5c",
			light: "#fef5e7",
			contrastText: "white",
		},
	},
	transitions: {
		duration: {
			shortest: 150,
			shorter: 200,
			short: 250,
			// most basic recommended timing
			standard: 300,
			// this is to be used in complex animations
			complex: 375,
			// recommended when something is entering screen
			enteringScreen: 225,
			// recommended when something is leaving screen
			leavingScreen: 195,
		},
	},
});

export default theme;
