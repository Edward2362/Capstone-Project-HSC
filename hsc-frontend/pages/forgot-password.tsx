import { pageBodyStyles } from "@/components/PageBody";
import { PageBodyLogo } from "@/components/PageBodyLogo";
import ProgressBar from "@/components/ProgressBar";
import { TextField, textFieldStyles } from "@/components/TextField";
import { forgotpwStyles as styles } from "@/styles/forgotpw";
import { post } from "@/utils/reqHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import EmailIcon from "@mui/icons-material/Email";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Alert, Box, Button, Typography } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const formSchema = yup.object({
	email: yup
		.string()
		.email("Please provide valid email!")
		.required("Please fill out this field!"),
});

type FormValues = yup.InferType<typeof formSchema>;

const defaultValues: FormValues = {
	email: "",
};

const ForgotPasswordEmail = () => {
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: defaultValues,
		resolver: yupResolver(formSchema),
	});

	const handleClose = () => {
		setIsError(false);
		setIsSuccess(false);
	};

	const onSubmit = async (data: { email: string }) => {
		setIsSuccess(false);
		setIsError(false);
		setIsLoading(true);
		const response = await post("/auth/forgot-password", data);
		if (!response.ok) {
			alert("Invalid Email!");
			setIsError(true);
		} else {
			setIsSuccess(true);
		}
		setIsLoading(false);
	};

	return (
		<>
			<Head>
				<title>Forgot Password | HSC</title>
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
						color: "white",
						textAlign: "center",
					}}
				>
					<Typography
						variant="h5"
						component="h1"
						sx={{
							fontWeight: 600,
						}}
					>
						Please enter your email!
					</Typography>
					<KeyboardArrowDownIcon />
				</Box>

				<PageBodyLogo />
			</Box>

			<Box sx={[pageBodyStyles.box, { px: 3, py: 6 }]}>
				{!isSuccess ? (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "1.5rem",
						}}
						component="form"
						onSubmit={handleSubmit(onSubmit)}
					>
						<TextField
							type="email"
							label="Email"
							placeholder="user@gmail.com"
							startIcon={<EmailIcon sx={textFieldStyles.icon} />}
							errorMessage={errors.email?.message}
							{...register("email")}
						/>
						<Button
							type="submit"
							disabled={isLoading}
							sx={{ width: 1, mb: 2 }}
						>
							SEND LINK
						</Button>
					</Box>
				) : (
					<Alert severity="success" sx={styles.noti}>
						An email has been sent. Please click the link to proceed
						further!
					</Alert>
				)}

				{isError ? (
					<Alert
						onClose={handleClose}
						severity="error"
						sx={styles.noti}
					>
						Something went wrong!
					</Alert>
				) : null}
			</Box>
		</>
	);
};

export default ForgotPasswordEmail;
