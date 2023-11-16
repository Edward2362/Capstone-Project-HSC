import {
	FormControl,
	FormHelperText,
	FormLabel,
	RadioGroup as MRadioGroup,
	RadioGroupProps,
	SxProps,
} from "@mui/material";
import { useId } from "react";

type Props = {
	containerSx?: SxProps;
	containerClassName?: string;
	label?: string;
	labelSx?: SxProps;
	labelClassName?: string;
	errorMessage?: string;
} & RadioGroupProps;

const RadioGroup = ({
	children,
	label,
	containerSx,
	containerClassName,
	labelSx,
	labelClassName,
	errorMessage,
	...restProps
}: Props) => {
	const inputId = useId();

	return (
		<FormControl
			sx={containerSx}
			className={containerClassName}
			error={!!errorMessage}
		>
			{label ? (
				<FormLabel id={inputId} sx={labelSx} className={labelClassName}>
					{label}
				</FormLabel>
			) : null}
			<MRadioGroup aria-labelledby={inputId} {...restProps}>
				{children}
			</MRadioGroup>
			<FormHelperText>{errorMessage}</FormHelperText>
		</FormControl>
	);
};

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
