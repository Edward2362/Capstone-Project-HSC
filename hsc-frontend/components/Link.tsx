import { SxPropsObject } from "@/types/mui-types";
import { LinkProps, Link as MLink } from "@mui/material";
import NLink from "next/link";

type Props = LinkProps & {
	sx?: SxPropsObject;
};

export const Link = ({ sx = {}, ...restProps }: Props) => {
	return (
		<MLink
			component={NLink}
			underline="none"
			variant="body2"
			sx={[
				{
					fontWeight: 600,
				},
				sx,
			]}
			{...restProps}
		/>
	);
};
