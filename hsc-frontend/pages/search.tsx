import { diseaseApi } from "@/apis/diseaseApi";
import { FormInputBase } from "@/components/FormInputBase";
import { PageBody } from "@/components/PageBody";
import { PageBodyLogo } from "@/components/PageBodyLogo";
import ProgressBar from "@/components/ProgressBar";
import { searchStyles as styles } from "@/styles/search";
import { IDisease } from "@/utils/interface/Disease";
import { ISearchInput } from "@/utils/interface/Form";
import { wait } from "@/utils/wait";
import { capitalizeFirstLetter } from "@/utils/words";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
	Box,
	Card,
	Collapse,
	Divider,
	IconButton,
	Typography,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GetServerSideProps } from "next";
import { ICustomer } from "@/utils/interface/Customer";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { getUserInfo } from "@/utils/reqHandler";
import { signOut } from "next-auth/react";

const defaultValues = {
	input: "",
};

interface Props {
	data: ICustomer;
	session: Session;
}

const Search = ({ data, session }: Props) => {
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
	const [suggestions, setSuggestions] = useState<IDisease[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const { watch, handleSubmit, resetField, control } = useForm<ISearchInput>({
		defaultValues,
	});

	const onSubmit = async (data: ISearchInput) => {
		console.log("diagnose", data);
	};

	const getSuggestion = async (input: string | undefined) => {
		try {
			const diseases = await diseaseApi.searchDiseases(input || "");
			setSuggestions(diseases);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (session === null) {
			signOut();
		}
	}, [session]);

	useEffect(() => {
		const subscription = watch((value) => {
			setIsLoading(true);
			timer !== null && clearTimeout(timer);

			let newTimer = setTimeout(() => {
				if (value.input !== "" && !value.input?.includes("[")) {
					getSuggestion(value.input);
				} else {
					setSuggestions([]);
					setIsLoading(false);
				}
			}, 1500);

			setTimer(newTimer);
		});
		return () => subscription.unsubscribe();
	}, [watch, timer]);

	return (
		<>
			<Head>
				<title>Search | HSC</title>
			</Head>

			<ProgressBar isLoading={isLoading} />

			<Box
				sx={{
					position: "relative",
					flex: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					mb: 7,
				}}
				component="form"
			>
				<Card
					sx={[
						styles.searchContainer,
						suggestions.length !== 0 && styles.suggestionFound,
					]}
				>
					<Box
						sx={[
							styles.searchBar,
							suggestions.length !== 0 && styles.searchBarStyle,
						]}
					>
						<IconButton
							color="inherit"
							type="submit"
							onClick={handleSubmit(onSubmit)}
						>
							<SearchRoundedIcon />
						</IconButton>
						<FormInputBase
							sx={{ padding: 0, fontSize: "1.1rem" }}
							color="secondary"
							name="input"
							placeholder="Type the disease name"
							control={control}
							fullWidth
							autoFocus
						/>
						{suggestions.length !== 0 && (
							<IconButton
								color="inherit"
								type="submit"
								onClick={() => {
									setSuggestions([]);
									resetField("input");
									setIsLoading(false);
								}}
							>
								<CloseRoundedIcon />
							</IconButton>
						)}
					</Box>
					<Divider
						sx={[
							{ margin: "8px 0", width: 0.8 },
							suggestions.length === 0 && { display: "none" },
						]}
					/>
					<Collapse sx={{ width: 1 }} in={suggestions.length !== 0}>
						<Box
							sx={[
								styles.suggestionsBody,
								suggestions.length !== 0 && {
									height: "auto",
									maxHeight: "50vh",
								},
							]}
						>
							{suggestions.map((suggestion) => (
								<Typography
									key={suggestion.id}
									sx={styles.suggestion}
									component={Link}
									href={`/diseases/${suggestion.id}`}
								>
									{capitalizeFirstLetter(suggestion.name)}
								</Typography>
							))}
						</Box>
					</Collapse>
				</Card>
				<PageBodyLogo />
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

export default Search;
