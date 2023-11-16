import { Option } from "@/pages/settings";
import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { useId } from "react";
import { Controller } from "react-hook-form";

const FormDrowDown = (props: any) => {
	const labelId = useId();

	return (
		<FormControl size={"small"} sx={props.sx}>
			<Controller
				render={({
					field: { onChange, value },
					fieldState: { error },
				}) => (
					<>
						<InputLabel error={!!error} id={labelId}>
							{props.label}
						</InputLabel>
						<Select
							labelId={labelId}
							onChange={onChange}
							value={value}
							label={props.label}
							error={!!error}
						>
							{props.options?.map((option: Option) => (
								<MenuItem
									key={option.value}
									value={option.value}
								>
									{option.label}
								</MenuItem>
							))}
						</Select>
						{!!error && (
							<FormHelperText error={true}>
								{error.message}
							</FormHelperText>
						)}
					</>
				)}
				control={props.control}
				name={props.name}
			/>
		</FormControl>
	);
};

export default FormDrowDown;
