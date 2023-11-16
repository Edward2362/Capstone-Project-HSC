import { SxPropsStatic } from "@/types/mui-types";
import {
	InputAdornment,
	TextField as MTextField,
	TextFieldProps as MTextFieldProps,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { ReactNode, forwardRef } from "react";

type TextFieldProps = {
	startIcon?: ReactNode;
	errorMessage?: string;
} & MTextFieldProps;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	({ startIcon, errorMessage, ...restProps }, ref) => {
		return (
			<MTextField
				inputRef={ref}
				error={!!errorMessage}
				helperText={errorMessage}
				InputProps={{
					startAdornment: startIcon ? (
						<InputAdornment position="start">
							{startIcon}
						</InputAdornment>
					) : null,
				}}
				{...restProps}
			/>
		);
	}
);

TextField.displayName = "TextField";

export const textFieldStyles = {
	icon: {
		fontSize: "1.1rem",
		color: grey["500"],
	} as SxPropsStatic,
} as const;
