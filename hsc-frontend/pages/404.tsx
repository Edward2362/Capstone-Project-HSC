import { Link } from "@/components/Link";
import { Alert } from "@mui/material";

export default function Error() {
	return (
		<Alert severity="error" sx={{ m: 2 }}>
			Page not found. Back to{" "}
			<Link
				sx={{
					"&:hover": {
						textDecoration: "underline",
					},
				}}
				href="/profile"
			>
				home
			</Link>
			.
		</Alert>
	);
}
