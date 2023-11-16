import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";
import { Controller } from "react-hook-form";

const FormDatePicker = (props: any) => {
	return (
		<Controller
			name={props.name}
			control={props.control}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<DatePicker
					disableFuture
					onChange={onChange}
					label={props.label}
					value={dayjs(value)}
					{...props}
				/>
			)}
		/>
	);
};

export default FormDatePicker;
