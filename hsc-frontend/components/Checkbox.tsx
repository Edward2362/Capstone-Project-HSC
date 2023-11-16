import { SxPropsObject } from "@/types/mui-types";
import {
	CheckboxProps,
	FormControlLabel,
	Checkbox as MCheckbox,
} from "@mui/material";
import { forwardRef } from "react";

type Props = {
	label?: string;
	labelFontSize?: string;
	containerSx?: SxPropsObject;
} & CheckboxProps;

export const Checkbox = forwardRef<HTMLInputElement, Props>(
	(
		{
			label,
			labelFontSize = "0.875rem",
			containerSx = {},
			size = "small",
			...restProps
		},
		ref
	) => {
		return (
			<FormControlLabel
				control={
					<MCheckbox inputRef={ref} size={size} {...restProps} />
				}
				slotProps={{
					typography: { fontSize: labelFontSize },
				}}
				sx={[{ m: 0 }, containerSx]}
				label={label}
			/>
		);
	}
);

Checkbox.displayName = "Checkbox";
