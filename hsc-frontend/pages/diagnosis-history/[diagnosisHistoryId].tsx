import { PageBodyLogo } from "@/components/PageBodyLogo";
import { PageFiller } from "@/components/PageFiller";
import { ICustomer } from "@/utils/interface/Customer";
import { Box, Button, Card, Link, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { Session, getServerSession } from "next-auth";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getAuth, getUserInfo } from "@/utils/reqHandler";
import { NestedPageHeader } from "@/components/NestedPageHeader";
import { signOut } from "next-auth/react";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { IDiagnosisHistory } from "@/utils/interface/DiagnosisHistory";
import { convertMdToHtml } from "@/utils/markdown";
import dayjs from "dayjs";

interface Props {
	data: ICustomer;
	session: Session;
}

const DiagnosisHistory = ({ data, session }: Props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [diagnosisHistoryData, setDiagnosisHistoryData] =
		useState<IDiagnosisHistory | null>(null);
	const router = useRouter();
	const { diagnosisHistoryId } = router.query;

	useEffect(() => {
		if (session === null) {
			signOut();
		}
	}, [session]);

	useEffect(() => {
		const getDiagnosisHistoryData = async () => {
			var res = await getAuth(
				`/diagnoses/${diagnosisHistoryId}`,
				session.user.accessToken
			);

			if (res.ok) {
				var resData = (await res.json()) as IDiagnosisHistory;
				setDiagnosisHistoryData(resData);
				setIsLoading(false);
			} else {
				router.replace("/404");
			}
		};

		getDiagnosisHistoryData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading) return <Loading />;

	return (
		<>
			<Head>
				<title>Diagnose History | HSC</title>
			</Head>

			<NestedPageHeader
				previousHref="/profile"
				title={dayjs(diagnosisHistoryData?.created).format("LLL")}
				containerSx={{ bgcolor: "white", color: "primary.main" }}
			/>

			<PageFiller
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					pb: 0,
				}}
			>
				<Card
					sx={{
						width: 1,
						p: 2,
						mb: 1,
						pt: 0,
						borderRadius: "1rem",
					}}
				>
					<Typography
						sx={{ my: 1 }}
						color={"secondary.dark"}
						align="center"
						variant="h6"
					>
						Question
					</Typography>
					<Typography>{diagnosisHistoryData?.question}</Typography>
				</Card>

				<Card
					sx={{
						width: 1,
						p: 2,
						pt: 0,
						borderRadius: "1rem",
						overflowY: "auto",
					}}
				>
					<Typography
						sx={{ my: 1 }}
						color={"secondary.dark"}
						align="center"
						variant="h6"
					>
						Answer
					</Typography>
					<div
						dangerouslySetInnerHTML={{
							__html: convertMdToHtml(
								diagnosisHistoryData?.answer,
								diagnosisHistoryData?.id
							),
						}}
						className="content"
					></div>
				</Card>

				<PageBodyLogo />
			</PageFiller>
			<Box
				sx={{
					px: 3,
					py: 2,
					gap: 2,
					display: "flex",
					flexDirection: "column",
					bgcolor: "white",
				}}
			>
				<Button
					LinkComponent={Link}
					href={"/diagnose"}
					disabled={isLoading}
					onClick={() => {
						setIsLoading(true);
					}}
				>
					Make New Diagnosis
				</Button>
			</Box>
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

export default DiagnosisHistory;
