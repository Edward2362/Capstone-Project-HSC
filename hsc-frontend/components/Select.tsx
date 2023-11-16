import {
	FormControl,
	InputLabel,
	Select as MSelect,
	SelectProps,
	SxProps,
} from "@mui/material";
import { forwardRef, useId } from "react";

type Props = {
	containerSx?: SxProps;
	containerClassName?: string;
} & SelectProps;

const Select = forwardRef<HTMLSelectElement, Props>(
	(
		{
			children,
			containerSx,
			containerClassName,
			label,
			size,
			...restProps
		},
		ref
	) => {
		const inputId = useId();

		return (
			<FormControl
				sx={containerSx}
				className={containerClassName}
				size={size}
			>
				{label ? <InputLabel id={inputId}>{label}</InputLabel> : null}
				<MSelect
					labelId={inputId}
					label={label}
					inputRef={ref}
					{...restProps}
				>
					{children}
				</MSelect>
			</FormControl>
		);
	}
);

Select.displayName = "Select";

export default Select;
