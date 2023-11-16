import { BoxProps } from "@mui/material";

export type SxPropsObject = Exclude<
	BoxProps["sx"],
	ReadonlyArray<any> | Function
>;
export type SxPropsStatic = Exclude<SxPropsObject, null | undefined>;
