import { authApi } from "@/apis/authApi";
import CircleIconCard from "@/components/CircleIconCard";
import Loading from "@/components/Loading";
import { PageBody } from "@/components/PageBody";
import { PageHeader } from "@/components/PageHeader";
import { PageSection } from "@/components/PageSection";
import ProgressBar from "@/components/ProgressBar";
import { profileStyles as styles } from "@/styles/profile";
import { age, toBloodType, toPhysique, toYesNo } from "@/utils/helper";
import { ICustomer } from "@/utils/interface/Customer";
import { getUserInfo } from "@/utils/reqHandler";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import CakeRoundedIcon from "@mui/icons-material/CakeRounded";
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import LiquorIcon from "@mui/icons-material/Liquor";
import LogoutIcon from "@mui/icons-material/Logout";
import MaleRoundedIcon from "@mui/icons-material/MaleRounded";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import SettingsIcon from "@mui/icons-material/Settings";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import { Box, Card, IconButton, Pagination } from "@mui/material";
import { GetServerSideProps } from "next";
import { Session, getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import DiagnosisHistoryCard from "@/components/DiagnosisHistoryCard";
import usePagination from "@/utils/hook/Pagination";

interface Props {
	data: ICustomer;
	session: Session;
}

const Customer = ({ data, session }: Props) => {
	const { update } = useSession();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const userBio = [
		{
			value: age(data?.dateOfBirth),
			subtitle: "Age",
			icon: <CakeRoundedIcon />,
		},
		{
			value: toPhysique(data?.height),
			subtitle: "Height",
			icon: <AlignVerticalBottomIcon />,
		},
		{
			value: toPhysique(data?.weight),
			subtitle: "Weight",
			icon: <MonitorWeightIcon />,
		},
		{
			value: toBloodType(data?.bloodType),
			subtitle: "Blood",
			icon: <BloodtypeIcon />,
		},
		{
			value: toYesNo(data?.isSmoking),
			subtitle: "Smoke",
			icon: <SmokingRoomsIcon />,
		},
		{
			value: toYesNo(data?.isDrinking),
			subtitle: "Drink",
			icon: <LiquorIcon />,
		},
	];
	const [page, setPage] = useState<number>(1);
	const PER_PAGE = 5;

	const count = Math.ceil(data?.diagnosisHistory.length / PER_PAGE);
	const _DATA = usePagination(data?.diagnosisHistory, PER_PAGE);

	useEffect(() => {
		if (session === null) {
			signOut();
		}
	}, [session]);

	useEffect(() => {
		const loadSession = async () => {
			await update({
				...session,
				user: {
					...session.user,
					user: {
						...session.user.user,
						...data,
						diagnosisHistory: null,
					},
				},
			});
		};
		if (data !== null) {
			loadSession();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const showPagination = () => {
		return (
			data?.diagnosisHistory?.length > PER_PAGE && (
				<Pagination
					count={count}
					page={page}
					size="small"
					shape="rounded"
					color="primary"
					siblingCount={1}
					boundaryCount={1}
					onChange={handleChange}
					sx={{ mb: 1 }}
				/>
			)
		);
	};

	const loadDiagnosisResult = () => {
		let data = _DATA.currentData();
		if (data.length === 0) return "No diagnosis history";
		return data?.map((result) => (
			<DiagnosisHistoryCard key={result.id} result={result} />
		));
	};

	const handleChange = (event: ChangeEvent<unknown>, destination: number) => {
		setPage(destination);
		_DATA.jump(destination);
	};

	const gender = (data: "MALE" | "FEMALE"): ReactNode => {
		if (data === "MALE") {
			return <MaleRoundedIcon />;
		} else if (data === "FEMALE") {
			return <FemaleRoundedIcon />;
		}
		return <HourglassEmptyRoundedIcon />;
	};

	const customSignOut = async () => {
		setIsLoading(true);
		try {
			await authApi.logout(session.user.accessToken);
			await signOut();
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	if (session === null) return <Loading />;

	return (
		<>
			<Head>
				<title>Profile | HSC</title>
			</Head>

			<ProgressBar isLoading={isLoading} />

			<PageHeader
				startComponent={
					<IconButton disabled={isLoading} onClick={customSignOut}>
						<LogoutIcon />
					</IconButton>
				}
				endComponent={
					<IconButton LinkComponent={Link} href="/settings">
						<SettingsIcon />
					</IconButton>
				}
				title="Profile"
			/>

			<PageBody
				sx={{
					pt: 1,
					gap: "2rem",
				}}
			>
				<PageSection title="Information">
					<Card sx={styles.cardContainer} elevation={0}>
						<CircleIconCard
							value={data?.name}
							subtitle={data?.email}
							icon={gender(data?.gender)}
						/>
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: "repeat(3, 1fr)",
								rowGap: 1,
							}}
						>
							{userBio.map((item, key) => (
								<CircleIconCard
									key={key.toString()}
									value={item.value}
									subtitle={item.subtitle}
									icon={item.icon}
								/>
							))}
						</Box>
					</Card>
				</PageSection>

				<PageSection title="Diagnosis History" sx={{ flex: 1 }}>
					<Box
						sx={[
							{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							},
							data?.diagnosisHistory.length === 0 && {
								justifyContent: "center",
								height: 1,
							},
						]}
					>
						{showPagination()}
						{loadDiagnosisResult()}
					</Box>
				</PageSection>
			</PageBody>
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

export default Customer;
