import { Box, CircularProgress, Fab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import EmailIcon from "@mui/icons-material/Email";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { getQuery } from "@/utils/reqHandler";
import { wait } from "@/utils/wait";

const WAIT_TIME_MS = 3000;
const WAIT_TIME_S = WAIT_TIME_MS / 1000;

const VerifyEmail = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [isInvalid, setIsInvalid] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isExpired, setIsExpired] = useState(false);
	const [isResend, setIsResend] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [notification, setNotification] = useState("Verifying");
	const { data: session, status } = useSession();

	useEffect(() => {
		let token = searchParams?.get("token");

		const isNotClientError = () => {
			if (session?.user.user.isVerify) {
				router.replace("/profile");
				return false;
			}
			return true;
		};

		const getVerifyStatus = async () => {
			var response = await getQuery("/auth/verify-email?token=" + token);
			setIsLoading(false);
			if (response.ok) {
				setIsSuccess(true);
				if (status === "authenticated") {
					setNotification(
						`Successfully verified email redirect back to profile page in ${WAIT_TIME_S}s`
					);
					await wait(WAIT_TIME_MS);
					router.replace("/profile");
				} else {
					setNotification(
						`Successfully verified email redirect back to login page in ${WAIT_TIME_S}s`
					);
					await wait(WAIT_TIME_MS);
					router.replace("/profile");
				}
			} else if (response.status === 410) {
				setIsExpired(true);
				setNotification(
					"Email expired. Please click here to send a new email."
				);
			} else if (response.status === 409) {
				setNotification("Email has been verified");
			} else if (response.status === 500) {
				setNotification(
					"Sorry, your verification link is not valid. Please check your mailbox again."
				);
			}
		};

		if (isNotClientError() && token !== null && status !== "loading") {
			let ignore = false;
			if (!ignore) {
				getVerifyStatus();
			}
			return () => {
				ignore = true;
			};
		} else {
			let noToken = setTimeout(() => {
				setNotification("Sorry, your verification link is not valid.");
				setIsLoading(false);
			}, 5000);
			return () => {
				clearTimeout(noToken);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams, status]);

	const handleButtonClick = async () => {
		if (isExpired) {
			const response = await getQuery(
				"/auth/resend-verification-email?token=" +
					searchParams?.get("token")
			);
			setIsExpired(false);
			setIsResend(true);
			if (response.ok) {
				setNotification("Please check your mailbox");
			}
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				height: "100vh",
				bgcolor: "white",
				px: 2,
			}}
		>
			<Typography
				sx={{
					mb: 2,
					textAlign: "center",
				}}
				variant="h4"
				color="primary"
			>
				{notification}
			</Typography>
			<Box
				sx={{
					m: 1,
					width: 1,
					position: "relative",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{!isResend && (
					<Fab
						disabled={isLoading}
						onClick={handleButtonClick}
						color={
							isSuccess
								? "primary"
								: isExpired
								? "secondary"
								: "error"
						}
					>
						{isLoading ? (
							<HourglassEmptyRoundedIcon fontSize="large" />
						) : isSuccess ? (
							<CheckIcon fontSize="large" />
						) : isExpired ? (
							<EmailIcon fontSize="large" />
						) : (
							<ErrorOutlineRoundedIcon fontSize="large" />
						)}
					</Fab>
				)}
				{isLoading && (
					<CircularProgress
						size={70}
						sx={{
							position: "absolute",
							left: 0,
							right: 0,
							top: 0,
							bottom: 0,
							zIndex: 1,
							m: "auto",
						}}
						color="secondary"
					/>
				)}
			</Box>
		</Box>
	);
};

export default VerifyEmail;
