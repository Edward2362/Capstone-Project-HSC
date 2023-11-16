import { Alert } from "@mui/material";

export default function Error() {
	return (
		<Alert severity="error" sx={{ m: 2 }}>
			Something went wrong! Try again later.
		</Alert>
	);
}
