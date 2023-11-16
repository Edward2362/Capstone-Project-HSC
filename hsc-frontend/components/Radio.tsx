import { Radio as MRadio, RadioProps } from "@mui/material";
import { forwardRef } from "react";

type Props = RadioProps;

const Radio = forwardRef<HTMLSelectElement, Props>(({ ...restProps }, ref) => {
	return <MRadio inputRef={ref} {...restProps} />;
});

Radio.displayName = "Radio";

export default Radio;
