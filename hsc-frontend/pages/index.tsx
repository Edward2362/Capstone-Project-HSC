import { pageBodyStyles } from "@/components/PageBody";
import { PageBodyLogo } from "@/components/PageBodyLogo";
import { Box, Button, Divider, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<Box
				sx={{
					position: "relative",
					flex: 1,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography
					sx={{ fontWeight: "bold", color: "secondary.main" }}
					variant="h2"
					component="h1"
				>
					HSC
				</Typography>

				<Divider
					sx={{ height: "4rem", mx: 2, bgcolor: "white" }}
					light
					variant="middle"
					orientation="vertical"
				/>

				<Typography
					sx={{ fontWeight: "normal", color: "white" }}
					variant="body2"
				>
					Health Symptom Checker
				</Typography>

				<PageBodyLogo />
			</Box>

			<Box
				sx={[
					pageBodyStyles.box,
					{
						p: 3,
						py: "4rem",
					},
				]}
			>
				<Button
					sx={{ width: 1, mb: 2 }}
					LinkComponent={Link}
					href="/login"
				>
					SIGN IN
				</Button>

				<Button
					sx={{ width: 1 }}
					variant="outlined"
					color="primary"
					LinkComponent={Link}
					href="/register"
				>
					SIGN UP
				</Button>
			</Box>
		</>
	);
}
