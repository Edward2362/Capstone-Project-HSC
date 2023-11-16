import { InputBase, styled } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		// vertical padding + font size from searchIcon
		padding: 0,
		transition: theme.transitions.create("width"),
		width: "100%",
	},
}));

export const FormInputBase = (props: any) => {
	return (
		<Controller
			name={props.name}
			control={props.control}
			render={({ field: { onChange, value } }) => (
				<StyledInputBase onChange={onChange} value={value} {...props} />
			)}
		/>
	);
};
