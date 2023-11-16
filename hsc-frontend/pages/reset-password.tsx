import { Checkbox } from "@/components/Checkbox";
import { pageBodyStyles } from "@/components/PageBody";
import { PageBodyLogo } from "@/components/PageBodyLogo";
import ProgressBar from "@/components/ProgressBar";
import Snackbar from "@/components/Snackbar";
import { TextField, textFieldStyles } from "@/components/TextField";
import { passwordRegex } from "@/utils/regexes";
import { post } from "@/utils/reqHandler";
import { wait } from "@/utils/wait";
import { yupResolver } from "@hookform/resolvers/yup";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LockIcon from "@mui/icons-material/Lock";
import { Box, Button, Typography } from "@mui/material";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const WAIT_TIME_MS = 3000;
const WAIT_TIME_S = WAIT_TIME_MS / 1000;

const formSchema = yup.object({
	password: yup
		.string()
		.required("Please fill out this field!")
		.matches(
			passwordRegex,
			"Please provide at least 8 characters with uppercase, lowercase, number and symbol"
		),
	retypePassword: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords must match")
		.required("Please fill out this field!"),
});

type FormValues = yup.InferType<typeof formSchema>;

const defaultValues: FormValues = {
	password: "",
	retypePassword: "",
};

const ResetPassword = () => {
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const searchParams = useSearchParams();
	const router = useRouter();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: defaultValues,
		resolver: yupResolver(formSchema),
	});

	const handleSnackbarClose = () => {
		setIsError(false);
		setIsSuccess(false);
	};

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		setIsError(false);

		const password = data.password;

		setIsLoading(true);
		const response = await post(
			"/auth/reset-password?token=" + searchParams?.get("token"),
			{ newPassword: password }
		);
		setIsLoading(false);

		if (response.ok) {
			setIsSuccess(true);
			await wait(WAIT_TIME_MS);
			router.replace("/login");
		} else {
			setIsError(true);
			await wait(WAIT_TIME_MS);
			router.replace("/forgot-password");
		}
	};

	return (
		<>
			<Head>
				<title>Reset Password | HSC</title>
			</Head>

			<ProgressBar isLoading={isLoading} />

			<Box
				sx={{
					position: "relative",
					flex: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Box
					sx={{
						mb: "1rem",
						textAlign: "center",
						color: "white",
					}}
				>
					<Typography
						variant="h6"
						component="h1"
						sx={{
							fontWeight: 600,
						}}
					>
						Please enter your new password!
					</Typography>
					<KeyboardArrowDownIcon />
				</Box>

				<PageBodyLogo />
			</Box>

			<Box sx={[pageBodyStyles.box, { px: 3, py: 6 }]}>
				<Box component="form" onSubmit={handleSubmit(onSubmit)}>
					<TextField
						type={showPassword ? "text" : "password"}
						label="Password"
						placeholder="••••••••"
						startIcon={<LockIcon sx={textFieldStyles.icon} />}
						errorMessage={errors.password?.message}
						{...register("password")}
					/>
					<TextField
						type={showPassword ? "text" : "password"}
						label="Confirm your password"
						placeholder="••••••••"
						startIcon={<LockIcon sx={textFieldStyles.icon} />}
						errorMessage={errors.retypePassword?.message}
						sx={{ mt: "1.5rem" }}
						{...register("retypePassword")}
					/>
					<Checkbox
						size="small"
						value={showPassword}
						labelFontSize="0.875rem"
						label="Show password"
						containerSx={{
							mt: "0.5rem",
							alignSelf: "self-start",
						}}
						onChange={(e) => setShowPassword(e.target.checked)}
					/>
					<Button
						type="submit"
						disabled={isLoading}
						sx={{ width: 1, mt: "1.5rem" }}
					>
						Change password
					</Button>
				</Box>

				<Snackbar
					open={isSuccess}
					autoHideDuration={WAIT_TIME_MS}
					onClose={handleSnackbarClose}
					severity="success"
				>
					Your new password has been saved! Redirect in {WAIT_TIME_S}{" "}
					seconds
				</Snackbar>
				<Snackbar
					open={isError}
					autoHideDuration={WAIT_TIME_MS}
					onClose={handleSnackbarClose}
					severity="error"
				>
					Invalid token! Redirect in {WAIT_TIME_S} seconds
				</Snackbar>
			</Box>
		</>
	);
};

export default ResetPassword;
