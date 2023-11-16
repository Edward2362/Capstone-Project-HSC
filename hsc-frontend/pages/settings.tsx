import FormCheckBox from "@/components/FormCheckBox";
import FormDrowDown from "@/components/FormDrowDown";
import { FormInputText } from "@/components/FormInputText";
import Loading from "@/components/Loading";
import { NestedPageHeader } from "@/components/NestedPageHeader";
import { PageBody } from "@/components/PageBody";
import ProgressBar from "@/components/ProgressBar";
import { settingStyles as styles } from "@/styles/setting";
import { ISetting } from "@/utils/interface/Setting";
import { getQuery, getUserInfo, patch } from "@/utils/reqHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, InputAdornment, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { Session, getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { authOptions } from "./api/auth/[...nextauth]";
import Head from "next/head";
import FormDatePicker from "@/components/FormDatePicker";
import { ICustomer } from "@/utils/interface/Customer";
import Snackbar from "@/components/Snackbar";
import { PageSection } from "@/components/PageSection";
import { wait } from "@/utils/wait";
import EmailIcon from "@mui/icons-material/Email";
import CircleIconCard from "@/components/CircleIconCard";

interface Props {
	data: ICustomer;
	session: Session;
}

export interface Option {
	label: string;
	value: string;
}

const bloodOptions: Option[] = [
	{
		label: "A+",
		value: "AP",
	},
	{
		label: "A-",
		value: "AN",
	},
	{
		label: "B+",
		value: "BP",
	},
	{
		label: "B-",
		value: "BN",
	},
	{
		label: "AB+",
		value: "ABP",
	},
	{
		label: "AB-",
		value: "ABN",
	},
	{
		label: "O+",
		value: "OP",
	},
	{
		label: "O-",
		value: "ON",
	},
];

const genderOptions: Option[] = [
	{
		label: "Female",
		value: "FEMALE",
	},
	{
		label: "Male",
		value: "MALE",
	},
];

const schema = yup.object({
	name: yup.string().required("Please fill in your name!"),
	dateOfBirth: yup.date().required("Please fill in your date of birth!"),
	gender: yup
		.mixed()
		.oneOf(["MALE", "FEMALE"], "Please select an available option!"),
	bloodType: yup
		.mixed()
		.oneOf(
			["AP", "AN", "BP", "BN", "ABP", "ABN", "OP", "ON"],
			"Please choose your blood type!"
		),
	height: yup.number().typeError("Please fill in your height in meter!"),
	weight: yup.number().typeError("Please fill in your weight in kilogram!"),
	isSmoking: yup.boolean(),
	isDrinking: yup.boolean(),
});

const Settings = ({ data, session }: Props) => {
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isCooldown, setIsCooldown] = useState<boolean>(false);
	const [notification, setNotification] = useState<string>("");
	const { update } = useSession();

	const router = useRouter();

	useEffect(() => {
		if (session === null) {
			signOut();
		}
	}, [session]);

	const defaultValues = {
		name: data?.name || "",
		dateOfBirth: new Date(data?.dateOfBirth),
		gender: data?.gender || "",
		bloodType: data?.bloodType || "",
		height: data?.height || "",
		weight: data?.weight || "",
		isSmoking: !!data?.isSmoking,
		isDrinking: !!data?.isDrinking,
	};

	const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setIsError(false);
		setIsSuccess(false);
	};

	const methods = useForm({
		defaultValues: defaultValues,
		// @ts-ignore
		resolver: yupResolver(schema),
	});
	const { handleSubmit, control } = methods;

	const onSubmit: SubmitHandler<ISetting> = async (dataSettings) => {
		setIsLoading(true);
		setIsSuccess(false);
		setIsError(false);

		const response = await patch(session, "/users/me", {
			name: dataSettings.name,
			dateOfBirth: dataSettings.dateOfBirth,
			gender: dataSettings.gender,
			bloodType: dataSettings.bloodType,
			height: dataSettings.height,
			weight: dataSettings.weight,
			isSmoking: dataSettings.isSmoking,
			isDrinking: dataSettings.isDrinking,
		});

		if (!response.ok) {
			setIsError(true);
			setNotification(
				"Please check your input and type in the new information that you wanted to change."
			);
			setIsLoading(false);
		} else {
			setIsSuccess(true);
			setNotification("Your new settings has been saved!");

			await update({
				...session,
				user: {
					...session.user,
					user: {
						...session.user.user,
						...data,
					},
				},
			});

			setTimeout(() => {
				router.push("/profile");
			}, 1500);

			setIsLoading(false);
		}
	};

	const handleResendMailClick = async () => {
		const response = await getQuery("/auth/re-verify?email=" + data.email);
		if (response.ok) {
			setIsSuccess(true);
			setNotification("Please check your mailbox.");
		} else if (response.status === 429) {
			setIsSuccess(false);
			setIsError(true);
			setIsCooldown(true);
			setNotification(
				"Please wait for 3 minutes before resending a new email."
			);
		} else {
			setIsError(true);
			setNotification("Email is not found.");
		}
		await wait(3000);
		setIsSuccess(false);
		setIsError(false);
	};

	if (session === null) return <Loading />;

	{
		return (
			<>
				<Head>
					<title>Setting | HSC</title>
				</Head>

				<ProgressBar isLoading={isLoading} />

				<NestedPageHeader previousHref="/profile" title="Settings" />

				<PageBody
					sx={{
						pt: 1,
						gap: "2rem",
					}}
				>
					<PageSection title="Authentication">
						<CircleIconCard
							value={data.email}
							subtitle={""}
							icon={<EmailIcon />}
						/>
						{!data.isVerify && (
							<Button
								variant="contained"
								disabled={isCooldown}
								onClick={handleResendMailClick}
								color="secondary"
								size="large"
								sx={{
									width: 1,
									margin: "1rem 0px 1rem",
									mb: 0,
								}}
							>
								{isCooldown
									? "COOLDOWN"
									: "RESEND VERIFICATION EMAIL"}
							</Button>
						)}
						<Button
							variant="contained"
							href="/change-password"
							color="secondary"
							size="large"
							sx={{ width: 1, margin: "1rem 0px 2rem" }}
						>
							Change Password
						</Button>
					</PageSection>
					<PageSection title="Personal Information">
						<Box component="form">
							<Box>
								<FormInputText
									sx={styles.formInput}
									name="name"
									control={control}
									label="Name"
									variant="outlined"
									fullWidth
									size="small"
									placeholder={data.name}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<PersonIcon />
											</InputAdornment>
										),
									}}
								/>
								<FormDatePicker
									sx={styles.formInput}
									name="dateOfBirth"
									control={control}
									label="Date of birth"
								/>
								<FormDrowDown
									sx={{ width: 1, ...styles.formInput }}
									name="gender"
									options={genderOptions}
									control={control}
									label="Gender"
								/>
								<Box
									sx={{
										display: "flex",
										width: 1,
										gap: 2,
										...styles.formInput,
									}}
								>
									<FormInputText
										name="height"
										control={control}
										label="Height (cm)"
										variant="outlined"
										size="small"
										placeholder={"170"}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<AlignVerticalBottomIcon />
												</InputAdornment>
											),
										}}
									/>
									<FormInputText
										name="weight"
										control={control}
										label="Weight (kg)"
										variant="outlined"
										size="small"
										placeholder={"69"}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<MonitorWeightIcon />
												</InputAdornment>
											),
										}}
									/>
								</Box>
								<FormDrowDown
									sx={{ width: 1, ...styles.formInput }}
									name="bloodType"
									options={bloodOptions}
									control={control}
									label="Blood Type"
								/>
								<Box
									sx={{
										display: "flex",
										width: 1,
										gap: 2,
										...styles.formInput,
									}}
								>
									<FormCheckBox
										name="isDrinking"
										control={control}
										label="Drinking"
									/>
									<FormCheckBox
										name="isSmoking"
										control={control}
										label="Smoking"
									/>
								</Box>
								<Button
									type="submit"
									variant="contained"
									onClick={handleSubmit(onSubmit)}
									color="secondary"
									disabled={isLoading}
									size="large"
									sx={{
										width: 1,
										margin: "1rem 0px 1rem",
										mt: 0,
									}}
								>
									CHANGE INFORMATION
								</Button>
								<Snackbar
									open={isSuccess || isError}
									autoHideDuration={5000}
									onClose={handleClose}
									severity={isSuccess ? "success" : "error"}
								>
									{notification}
								</Snackbar>
							</Box>
						</Box>
					</PageSection>
				</PageBody>
			</>
		);
	}
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

export default Settings;
