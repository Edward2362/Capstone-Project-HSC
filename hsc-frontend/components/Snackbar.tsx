import {
	Alert,
	AlertProps,
	Snackbar as MSnackbar,
	SnackbarProps,
} from "@mui/material";
import { SyntheticEvent } from "react";

type Props = {
	onClose: () => void;
	open?: SnackbarProps["open"];
	autoHideDuration?: SnackbarProps["autoHideDuration"];
	severity?: AlertProps["severity"];
	children?: AlertProps["children"];
};

const Snackbar = ({
	onClose,
	open,
	autoHideDuration,
	severity,
	children,
	...restProps
}: Props) => {
	const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		onClose();
	};

	return (
		<MSnackbar
			onClose={handleClose}
			open={open}
			autoHideDuration={autoHideDuration}
			{...restProps}
		>
			<Alert
				onClose={handleClose}
				severity={severity}
				style={{ width: "100%" }}
			>
				{children}
			</Alert>
		</MSnackbar>
	);
};

export default Snackbar;
