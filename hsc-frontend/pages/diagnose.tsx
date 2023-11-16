import { PageBodyLogo } from "@/components/PageBodyLogo";
import { PageFiller } from "@/components/PageFiller";
import { TextField } from "@/components/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	Box,
	Button,
	Card,
	Collapse,
	Skeleton,
	Typography,
} from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import {
	convert_contraction,
	getWordCount,
	isSufficientInfo,
} from "@/utils/helper";
import { signOut, useSession } from "next-auth/react";
import { getUserInfo, postAuth } from "@/utils/reqHandler";
import { convertMdToHtml } from "@/utils/markdown";
import ProgressBar from "@/components/ProgressBar";
import { GetServerSideProps } from "next";
import { Session, getServerSession } from "next-auth";
import { ICustomer } from "@/utils/interface/Customer";
import { authOptions } from "./api/auth/[...nextauth]";
import Loading from "@/components/Loading";
import dayjs from "dayjs";

const formSchema = yup.object({
	input: yup
		.string()
		.required("Please describe your symptoms.")
		.test({
			name: "is-shorter-than-200",
			test(value, ctx) {
				let descLength = getWordCount(value);
				if (descLength > 200) {
					return ctx.createError({
						message:
							"Please keep your description under 200 words.",
					});
				}
				return true;
			},
		}),
});

interface Props {
	data: ICustomer;
	session: Session;
}

type FormValues = yup.InferType<typeof formSchema>;

const Diagnose = ({ data, session }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState("");
	const [diagnosisHistoryId, setDiagnosisHistoryId] = useState("");
	const [isMoreThanFive, setIsMoreThanFive] = useState(false);
	const notifications = [
		"It might take some time for me to analyse your health.",
		"Just want you to know, I'm very appreciate your wait. I'll finish my analysis soon.",
		"In order to produce a best prediction, I need time to look at all possibilities.",
	];
	const [notificationIndex, setNotificationIndex] = useState(
		notifications.length - 1
	);

	useEffect(() => {
		if (session === null) {
			signOut();
		}
	}, [session]);

	useEffect(() => {
		let showNotification: ReturnType<typeof setInterval>;

		if (isLoading) {
			showNotification = setInterval(() => {
				if (notificationIndex === notifications.length - 1) {
					setNotificationIndex(0);
				} else {
					setNotificationIndex(notificationIndex + 1);
				}
			}, 7000);
		}

		return () => {
			clearInterval(showNotification);
		};
	}, [isLoading, notificationIndex, notifications.length]);

	const methods = useForm<FormValues>({
		defaultValues: { input: "" },
		resolver: yupResolver(formSchema),
		mode: "onSubmit",
	});

	const {
		handleSubmit,
		register,
		watch,
		trigger,
		formState: { errors },
	} = methods;

	const watchInput = watch("input", "");

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		const currentDate = new Date();
		const processed_data = convert_contraction(data.input);
		const input = {
			message: data.input,
			processedMessage: processed_data,
			createdAt: currentDate.toISOString(),
			frontendUrl: window.location.origin,
		};
		try {
			setIsLoading(true);
			var notiTimeout = setTimeout(() => setIsMoreThanFive(true), 7000);
			const res = await postAuth(
				"/diagnoses/chat",
				input,
				session?.user.accessToken
			);
			var diagnoses = (await res.json()) as {
				result: string;
				diagnosisHistoryId: string;
			};
			clearTimeout(notiTimeout);
			setResult(diagnoses.result);
			setDiagnosisHistoryId(diagnoses.diagnosisHistoryId);
			setIsLoading(false);
			setIsMoreThanFive(false);
		} catch (error) {
			setResult("Something went wrong, please try again!");

			console.error(error);
		}
	};

	const textField = register("input");

	if (session === null) return <Loading />;

	return (
		<>
			<Head>
				<title>Diagnose | HSC</title>
			</Head>

			<ProgressBar isLoading={isLoading} />

			<PageFiller
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Collapse sx={{ width: 1 }} in={isMoreThanFive}>
					<Card sx={{ width: 1, p: 2, mb: 1, borderRadius: "1rem" }}>
						<Typography>
							{notifications[notificationIndex]}
						</Typography>
					</Card>
				</Collapse>

				<Card sx={{ width: 1, p: 2, mb: 1, borderRadius: "1rem" }}>
					<Collapse in={!isLoading}>
						{result ? (
							<div
								dangerouslySetInnerHTML={{
									__html: convertMdToHtml(
										result,
										diagnosisHistoryId
									),
								}}
								className="content"
							></div>
						) : (
							<Typography>
								{isSufficientInfo(session?.user.user).message}
							</Typography>
						)}
					</Collapse>

					<Collapse in={isLoading}>
						<Box>
							<Skeleton
								animation="wave"
								variant="rounded"
								sx={{ height: "4rem", mb: "1.5rem" }}
							/>
							{/* End Head */}
							<Skeleton
								animation="wave"
								variant="text"
								sx={{
									ml: "0.5rem",
									height: "1.2rem",
									mb: "0.5rem",
								}}
							/>
							<Skeleton
								animation="wave"
								variant="rounded"
								sx={{
									ml: "1.5rem",
									mt: "0.25rem",
									height: "5rem",
								}}
							/>
							{/* End 1 disease */}
							<Skeleton
								animation="wave"
								variant="text"
								sx={{
									ml: "0.5rem",
									height: "1.2rem",
									mb: "0.5rem",
									mt: "1.5rem",
								}}
							/>
							<Skeleton
								animation="wave"
								variant="rounded"
								sx={{
									ml: "1.5rem",
									mt: "0.25rem",
									height: "6rem",
									mb: "1.5rem",
								}}
							/>
							{/* End 2 disease */}
							<Skeleton
								animation="wave"
								variant="text"
								sx={{
									ml: "0.5rem",
									height: "1.2rem",
									mb: "0.5rem",
								}}
							/>
							<Skeleton
								animation="wave"
								variant="rounded"
								sx={{
									ml: "1.5rem",
									mt: "0.25rem",
									height: "7rem",
								}}
							/>
							{/* End 3 disease */}
							<Skeleton
								animation="wave"
								variant="rounded"
								sx={{ height: "4rem", mt: "1.5rem" }}
							/>
						</Box>
					</Collapse>
				</Card>

				<Card
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					sx={{ width: 1, p: 2, mb: 1, borderRadius: "1rem" }}
				>
					{isSufficientInfo(session?.user.user).status ? (
						<>
							<TextField
								variant="outlined"
								multiline
								minRows={1}
								maxRows={8}
								helperText={
									errors.input
										? errors.input.message
										: `${getWordCount(
												watchInput
										  )}/${200} words`
								}
								{...textField}
								error={!!errors.input?.message}
								onChange={(e) => {
									textField.onChange(e);
									trigger("input");
								}}
							/>
							<Button
								type="submit"
								sx={{ mt: 1 }}
								disabled={isLoading}
							>
								START DIAGNOSE
							</Button>
						</>
					) : (
						<Button disabled={isLoading} href="/settings">
							GO TO SETTINGS
						</Button>
					)}
				</Card>
				<PageBodyLogo />
			</PageFiller>
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

export default Diagnose;
