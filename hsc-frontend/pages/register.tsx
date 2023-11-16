import { authApi } from "@/apis/authApi";
import { Checkbox } from "@/components/Checkbox";
import { Link } from "@/components/Link";
import { pageBodyStyles } from "@/components/PageBody";
import ProgressBar from "@/components/ProgressBar";
import Snackbar from "@/components/Snackbar";
import { TextField, textFieldStyles } from "@/components/TextField";
import { passwordRegex } from "@/utils/regexes";
import { wait } from "@/utils/wait";
import { yupResolver } from "@hookform/resolvers/yup";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const formSchema = yup.object({
	name: yup.string().required("Please fill out this field!"),
	email: yup
		.string()
		.email("Please provide valid email!")
		.required("Please fill out this field!"),
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
	name: "",
	email: "",
	password: "",
	retypePassword: "",
};

const Register = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [notification, setNotification] = useState("");

	const router = useRouter();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: defaultValues,
		resolver: yupResolver(formSchema),
	});

	const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
		setIsLoading(true);
		const { retypePassword, ...reqData } = data;
		try {
			await authApi.register(reqData);
			setNotification(
				"Successfully create account. Please check your mailbox!"
			);
			setIsSuccess(true);
			await wait(3000);
			router.replace("/login");
		} catch (error) {
			setNotification("Email has already been used!");
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSnackbarClose = () => setIsError(false);

	return (
		<>
			<Head>
				<title>Register | HSC</title>
			</Head>

			<ProgressBar isLoading={isLoading} />

			<Typography
				sx={{
					my: 8,
					fontWeight: 700,
					color: "white",
					textAlign: "center",
				}}
				variant="h4"
				component="h1"
			>
				Sign Up
			</Typography>

			<Box
				sx={[
					pageBodyStyles.box,
					{ p: 3, pt: 5, textAlign: "center", flexGrow: 1 },
				]}
			>
				<Box
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					sx={{
						"--spacing": "1.5rem",
						width: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<TextField
						type="text"
						label="Full name"
						placeholder="Nguyen Van A"
						startIcon={<PersonIcon sx={textFieldStyles.icon} />}
						errorMessage={errors.name?.message}
						{...register("name")}
					/>
					<TextField
						type="email"
						label="Email"
						placeholder="newuser@gmail.com"
						startIcon={<EmailIcon sx={textFieldStyles.icon} />}
						errorMessage={errors.email?.message}
						sx={{ mt: "var(--spacing)" }}
						{...register("email")}
					/>
					<TextField
						type={showPassword ? "text" : "password"}
						label="Password"
						placeholder="••••••••"
						startIcon={<LockIcon sx={textFieldStyles.icon} />}
						errorMessage={errors.password?.message}
						sx={{ mt: "var(--spacing)" }}
						{...register("password")}
					/>
					<TextField
						type={showPassword ? "text" : "password"}
						label="Confirm your password"
						placeholder="••••••••"
						startIcon={<LockIcon sx={textFieldStyles.icon} />}
						errorMessage={errors.retypePassword?.message}
						sx={{ mt: "var(--spacing)" }}
						{...register("retypePassword")}
					/>

					<Checkbox
						size="small"
						value={showPassword}
						label="Show password"
						labelFontSize="0.875rem"
						containerSx={{
							mt: "0.5rem",
							alignSelf: "self-start",
						}}
						onChange={(e) => setShowPassword(e.target.checked)}
					/>

					<Button
						type="submit"
						sx={{ width: 0.6, mt: "2.5rem" }}
						disabled={isLoading}
					>
						SIGN UP
					</Button>
				</Box>

				<Typography variant="body2" sx={{ mt: "1rem" }}>
					Already have an account?&nbsp;
					<Link href="/login">Sign In</Link>
				</Typography>
			</Box>

			<Snackbar
				open={isError || isSuccess}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
				severity={isError ? "error" : "success"}
			>
				{notification}
			</Snackbar>
		</>
	);
};

export default Register;
