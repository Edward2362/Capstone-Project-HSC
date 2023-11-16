import { LinearProgress } from "@mui/material";

interface Props {
	isLoading: boolean;
}
const ProgressBar = ({ isLoading }: Props) => {
	return (
		<LinearProgress
			sx={[
				{
					zIndex: 999,
					top: 0,
					left: 0,
					position: "absolute",
					width: 1,
					display: !isLoading ? "none" : null,
				},
			]}
			color="secondary"
		/>
	);
};

export default ProgressBar;
