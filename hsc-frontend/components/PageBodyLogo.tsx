import { SxPropsObject } from "@/types/mui-types";
import { Box, BoxProps } from "@mui/material";

type Props = BoxProps & {
	sx?: SxPropsObject;
};

export const PageBodyLogo = ({ sx = {}, ...restProps }: Props) => {
	return (
		<Box
			component="img"
			src="/Logo.svg"
			alt=""
			sx={[
				{
					position: "absolute",
					left: 0,
					right: 0,
					bottom: 0,
					m: "auto",
					width: "10rem",
					userSelect: "none",
					zIndex: -1,
				},
				sx,
			]}
			{...restProps}
		/>
	);
};
