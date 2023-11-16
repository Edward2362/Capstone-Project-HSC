import { diseaseApi } from "@/apis/diseaseApi";
import { NestedPageHeader } from "@/components/NestedPageHeader";
import { PageBody } from "@/components/PageBody";
import { IDisease } from "@/utils/interface/Disease";
import { capitalizeFirstLetter } from "@/utils/words";
import { Box, Chip, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

type StaticProps = {
	disease: IDisease | null;
};

type Props = StaticProps;

const Disease = ({ disease }: Props) => {
	const router = useRouter();

	const { diagnosisHistoryId } = router.query;

	return (
		<>
			<Head>
				<title>Disease | HSC</title>
			</Head>

			<NestedPageHeader
				previousHref={
					diagnosisHistoryId
						? `/diagnosis-history/${diagnosisHistoryId}`
						: "/search"
				}
				title={disease?.name}
			/>

			<PageBody>
				<Typography
					variant="h5"
					component="h2"
					sx={{ mb: 2, fontWeight: 600 }}
				>
					{capitalizeFirstLetter(disease?.name)}
				</Typography>

				{/* begin symptoms */}
				<Box
					component="ul"
					sx={{
						listStyle: "none",
						display: "flex",
						flexWrap: "wrap",
						gap: 1,
						alignItems: "center",
					}}
				>
					<Box component="li" sx={{ fontSize: "0.875rem" }}>
						Symptoms:
					</Box>
					{disease?.symptoms.map((symptom) => (
						<Chip
							component="li"
							label={symptom.name}
							key={symptom.id}
						/>
					))}
					{/* end symptoms */}
				</Box>

				{disease?.description ? (
					<Typography sx={{ mt: 2, mb: 3 }}>
						{disease?.description}
					</Typography>
				) : null}

				{/* begin precautions */}
				{disease?.precautions?.length ? (
					<>
						<Typography sx={{ fontWeight: 500, mb: 1 }}>
							Precautions
						</Typography>
						<Box
							component="ol"
							sx={{
								ml: 3,
							}}
						>
							{disease?.precautions?.map((precaution) => (
								<Box component="li" key={precaution.id}>
									{capitalizeFirstLetter(
										precaution.description
									)}
								</Box>
							))}
						</Box>
					</>
				) : null}
				{/* end precautions */}
			</PageBody>
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	let diseases: IDisease[] = [];
	try {
		diseases = await diseaseApi.getDiseases();
	} catch (error) {
		console.error(error);
	}

	const paths = diseases.map((disease) => ({
		params: { diseaseId: disease.id.toString() },
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
	let tempDiseaseId = context.params?.diseaseId;
	let diseaseId = "";

	if (Array.isArray(tempDiseaseId)) {
		diseaseId = tempDiseaseId[0];
	} else {
		diseaseId = tempDiseaseId || "";
	}

	let disease: IDisease | null = null;

	try {
		disease = await diseaseApi.getDisease(diseaseId);
	} catch (error) {
		console.error(error);
	}

	return {
		props: {
			disease,
		},
	};
};

export default Disease;
