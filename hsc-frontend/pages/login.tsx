import { Checkbox } from "@/components/Checkbox";
import { Link } from "@/components/Link";
import { pageBodyStyles } from "@/components/PageBody";
import ProgressBar from "@/components/ProgressBar";
import Snackbar from "@/components/Snackbar";
import { TextField, textFieldStyles } from "@/components/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Box, Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const formSchema = yup.object({
	email: yup
		.string()
		.email("Please provide a valid email")
		.required("Please enter your email"),
	password: yup.string().required("Please enter your password"),
});

type FormValues = yup.InferType<typeof formSchema>;

const defaultValues: FormValues = {
	email: "",
	password: "",
};

const Login = () => {
	const router = useRouter();
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues,
		resolver: yupResolver(formSchema),
	});

	const handleSnackbarClose = () => {
		setIsError(false);
	};

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		setIsLoading(true);
		await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: false,
		})
			.then((res) => {
				if (res?.ok) {
					setIsError(false);
					router.replace("/profile");
				} else {
					setIsError(true);
					setIsLoading(false);
				}
			})
			.catch(console.error);
	};

	return (
		<>
			<Head>
				<title>Login | HSC</title>
			</Head>

			<ProgressBar isLoading={isLoading} />

			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					py: 6,
				}}
			>
				<Box
					component="img"
					src="/Logo.svg"
					alt=""
					sx={{
						height: "8rem",
					}}
				/>
				<Typography
					sx={{
						mt: 3,
						color: "white",
						textAlign: "center",
						fontWeight: 600,
						fontSize: "1.1rem",
					}}
				>
					Health Symptoms Checker
				</Typography>
			</Box>

			<Box sx={[pageBodyStyles.box, { p: 3, flexGrow: 1 }]}>
				<Box
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					sx={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography
						sx={(theme) => ({
							mb: "1.5rem",
							color: theme.palette.primary.main,
							fontWeight: 700,
						})}
						variant="h4"
						component="h1"
					>
						Sign In
					</Typography>

					<TextField
						type="email"
						label="Email"
						placeholder="user@gmail.com"
						startIcon={<EmailIcon sx={textFieldStyles.icon} />}
						errorMessage={errors.email?.message}
						{...register("email")}
					/>

					<TextField
						type={showPassword ? "text" : "password"}
						label="Password"
						placeholder="••••••••"
						startIcon={<LockIcon sx={textFieldStyles.icon} />}
						errorMessage={errors.password?.message}
						sx={{ mt: "1.5rem" }}
						{...register("password")}
					/>

					<Box
						sx={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							flexWrap: "wrap",
							mt: "0.25rem",
							pr: "0.5rem",
						}}
					>
						<Checkbox
							size="small"
							value={showPassword}
							labelFontSize="0.875rem"
							label="Show password"
							onChange={(e) => setShowPassword(e.target.checked)}
						/>

						<Link href="/forgot-password">
							Forgot your password?
						</Link>
					</Box>

					<Button
						type="submit"
						disabled={isLoading}
						sx={{ width: 0.6, mt: "2.5rem" }}
					>
						SIGN IN
					</Button>

					<Typography variant="body2" sx={{ mt: "1rem" }}>
						Don&apos;t have an account yet?&nbsp;
						<Link href="/register">Sign Up</Link>
					</Typography>
				</Box>
			</Box>

			<Snackbar
				open={isError}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
				severity="error"
			>
				Incorrect email or password
			</Snackbar>
		</>
	);
};

export default Login;
