import { PageHeader, PageHeaderProps } from "@/components/PageHeader";
import { SxPropsObject } from "@/types/mui-types";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
	previousHref: string;
	containerSx?: SxPropsObject;
} & Omit<PageHeaderProps, "startComponent">;

// for pages with a back button
export const NestedPageHeader = ({
	title,
	endComponent,
	previousHref,
	containerSx = {},
}: Props) => {
	return (
		<PageHeader
			startComponent={
				<IconButton LinkComponent={Link} href={previousHref}>
					<ArrowBackRoundedIcon fontSize="small" />
				</IconButton>
			}
			endComponent={endComponent}
			title={title}
			containerSx={containerSx}
		/>
	);
};
