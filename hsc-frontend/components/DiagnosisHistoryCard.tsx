import { Box, ButtonBase, Card, Typography } from "@mui/material";
import React from "react";
import CircleIconCard from "./CircleIconCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { IDiagnosisHistory } from "@/utils/interface/DiagnosisHistory";
import dayjs from "dayjs";
import { useRouter } from "next/router";

interface Props {
	result: IDiagnosisHistory;
}

const DiagnosisHistoryCard = (props: Props) => {
	const router = useRouter();

	return (
		<Card
			elevation={0}
			sx={(theme) => ({
				width: 1,
				mb: 1,
				borderRadius: "1rem",
				bgcolor: theme.palette.primary.main,
				overflow: "hidden",
			})}
		>
			<ButtonBase
				sx={(theme) => ({
					ml: 1,
					width: 1,
					padding: 2,
					display: "block",
					pl: 1,
					bgcolor: theme.palette.secondary.light,
					textAlign: "left",
				})}
				onClick={() =>
					router.push(`/diagnosis-history/${props.result.id}`)
				}
			>
				<Box sx={{ width: 1 }}>
					<CircleIconCard
						icon={<CalendarMonthIcon />}
						value={dayjs(props.result.created).format("LLL")}
						subtitle={props.result.question}
						noWrap
					/>
				</Box>
			</ButtonBase>
		</Card>
	);
};

export default DiagnosisHistoryCard;
