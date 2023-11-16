import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

const FormCheckBox = (props: any) => {
	return (
		<FormControlLabel
			control={
				<Controller
					name={props.name}
					control={props.control}
					render={({ field: { onChange, value } }) => (
						<Checkbox
							onChange={onChange}
							checked={value}
							{...props}
						/>
					)}
				/>
			}
			label={props.label}
		/>
	);
};

export default FormCheckBox;
