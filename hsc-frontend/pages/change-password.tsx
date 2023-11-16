import { ApiError } from "@/apis/ApiError";
import { authApi } from "@/apis/authApi";
import { Checkbox } from "@/components/Checkbox";
import { NestedPageHeader } from "@/components/NestedPageHeader";
import { PageBody } from "@/components/PageBody";
import ProgressBar from "@/components/ProgressBar";
import Snackbar from "@/components/Snackbar";
import { TextField, textFieldStyles } from "@/components/TextField";
import { ICustomer } from "@/utils/interface/Customer";
import { passwordRegex } from "@/utils/regexes";
import { getUserInfo } from "@/utils/reqHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import LockIcon from "@mui/icons-material/Lock";
import { Box, Button } from "@mui/material";
import { GetServerSideProps } from "next";
import { Session, getServerSession } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { authOptions } from "./api/auth/[...nextauth]";
import Loading from "@/components/Loading";
import { signOut } from "next-auth/react";

const formSchema = yup.object({
	oldPassword: yup
		.string()
		.required("Please fill out this field!")
		.matches(
			passwordRegex,
			"Please provide at least 8 characters with uppercase, lowercase, number and symbol"
		),
	newPassword: yup
		.string()
		.notOneOf(
			[yup.ref("oldPassword")],
			"Old password must not match new password"
		)
		.required("Please fill out this field!")
		.matches(
			passwordRegex,
			"Please provide at least 8 characters with uppercase, lowercase, number and symbol"
		),
	retypePassword: yup
		.string()
		.oneOf([yup.ref("newPassword")], "Passwords must match new password")
		.required("Please fill out this field!"),
});

type FormValues = yup.InferType<typeof formSchema>;

const defaultValues: FormValues = {
	oldPassword: "",
	newPassword: "",
	retypePassword: "",
};

type Props = {
	session: Session;
};

const ChangePassword = ({ session }: Props) => {
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [alertContent, setAlertContent] = useState("");

	const router = useRouter();

	useEffect(() => {
		if (session === null) {
			signOut();
		}
	}, [session]);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues,
		resolver: yupResolver(formSchema),
	});

	const handleClose = () => {
		setIsError(false);
		setIsSuccess(false);
	};

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		const { oldPassword, newPassword } = data;
		setIsSuccess(false);
		setIsLoading(true);
		setIsError(false);

		try {
			await authApi.changePassword(
				{
					oldPassword,
					newPassword,
				},
				session.user.accessToken
			);

			setIsLoading(false);
			setIsSuccess(true);

			setTimeout(() => {
				router.push("/profile");
			}, 1500);
		} catch (error) {
			setIsLoading(false);
			setIsError(true);

			if (error instanceof ApiError) {
				if (error.status === 401) {
					return setAlertContent(
						"Your old password does not match, please try again"
					);
				}
			}

			setAlertContent("Please check your password input and resubmit");
		}
	};

	if (session === null) return <Loading />;

	return (
		<>
			<Head>
				<title>Change Password | HSC</title>
			</Head>

			<ProgressBar isLoading={isLoading} />

			<NestedPageHeader
				previousHref="/settings"
				title="Change password"
			/>

			<PageBody sx={{ pt: 4 }}>
				<Box
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					sx={{
						"--spacing": "1.5rem",
					}}
				>
					<TextField
						type={showPassword ? "text" : "password"}
						label="Old password"
						placeholder="••••••••"
						startIcon={<LockIcon sx={textFieldStyles.icon} />}
						errorMessage={errors.oldPassword?.message}
						{...register("oldPassword")}
					/>
					<TextField
						type={showPassword ? "text" : "password"}
						label="New password"
						placeholder="••••••••"
						startIcon={<LockIcon sx={textFieldStyles.icon} />}
						errorMessage={errors.newPassword?.message}
						sx={{ mt: "var(--spacing)" }}
						{...register("newPassword")}
					/>
					<TextField
						type={showPassword ? "text" : "password"}
						label="Confirm new password"
						placeholder="••••••••"
						startIcon={<LockIcon sx={textFieldStyles.icon} />}
						errorMessage={errors.retypePassword?.message}
						sx={{ mt: "var(--spacing)" }}
						{...register("retypePassword")}
					/>
					<Checkbox
						size="small"
						labelFontSize="0.875rem"
						value={showPassword}
						containerSx={{
							mt: "0.5rem",
							alignSelf: "self-start",
						}}
						label="Show password"
						onChange={(e) => setShowPassword(e.target.checked)}
					/>
					<Button
						type="submit"
						variant="contained"
						color="secondary"
						size="large"
						sx={{ width: 1, mt: "2.5rem" }}
					>
						CHANGE PASSWORD
					</Button>
				</Box>
			</PageBody>

			<Snackbar
				open={isSuccess}
				autoHideDuration={3000}
				onClose={handleClose}
				severity="success"
			>
				You have successfully updated your password
			</Snackbar>
			<Snackbar
				open={isError}
				autoHideDuration={3000}
				onClose={handleClose}
				severity="error"
			>
				{alertContent}
			</Snackbar>
		</>
	);
};

export const getServerSideProps: GetServerSideProps<{
	data: ICustomer | null;
	session: Session | null;
}> = async (context) => {
	const session = await getServerSession(
		context.req,
		context.res,
		authOptions
	);

	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	const data = await getUserInfo(session);

	if (!data) {
		return {
			props: {
				data: null,
				session: null,
			},
		};
	}

	return {
		props: {
			data,
			session,
		},
	};
};

export default ChangePassword;
