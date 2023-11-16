import { Box, Card, Divider } from "@mui/material";
import React from "react";
import CircleIconCard from "./CircleIconCard";
import BadgeIcon from "@mui/icons-material/Badge";
import DescriptionIcon from "@mui/icons-material/Description";

interface IMember {
	name: string;
	avatar: string;
	roles: string[];
	email: string;
}

interface Props {
	member: IMember;
}

const MemberCard = ({ member }: Props) => {
	return (
		<Box
			sx={{
				mb: "2rem",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Card
				elevation={0}
				sx={{
					width: "120px",
					borderRadius: 100,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					bgcolor: "secondary.light",
					padding: 1,
				}}
			>
				<Box
					component="img"
					src={member.avatar}
					sx={{
						borderRadius: 100,
						objectFit: "cover",
						aspectRatio: "1/1",
						width: 1,
					}}
				/>
			</Card>

			<Divider
				sx={{ height: "4rem", mx: 0.5, bgcolor: "white" }}
				light
				variant="middle"
				orientation="vertical"
			/>

			<Card
				elevation={0}
				sx={{
					padding: 1.5,
					width: 1,
					bgcolor: "secondary.light",
					borderRadius: "1rem",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					position: "relative",
					gap: 1,
				}}
			>
				<CircleIconCard
					icon={<BadgeIcon />}
					value={member.name}
					subtitle={member.email}
				/>
				<CircleIconCard
					icon={<DescriptionIcon />}
					value={member.roles[1]}
					subtitle={member.roles[0]}
				/>
			</Card>
		</Box>
	);
};

export default MemberCard;
