import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";

const BottomNav = () => {
	const [value, setValue] = useState("");

	const router = useRouter();

	const onChange = (
		_event: SyntheticEvent<Element, Event>,
		newValue: string
	) => {
		setValue(newValue);
	};

	useEffect(() => {
		setValue(router.pathname);
	}, [router.pathname]);

	return (
		<Paper
			elevation={3}
			sx={{
				position: "fixed",
				zIndex: "0",
				bottom: 0,
				left: 0,
				right: 0,
			}}
		>
			<BottomNavigation
				showLabels={false}
				value={value}
				onChange={onChange}
			>
				<BottomNavigationAction
					label="Profile"
					value="/profile"
					icon={<AccountCircleIcon />}
					LinkComponent={Link}
					href="/profile"
				/>
				<BottomNavigationAction
					label="Diagnose"
					value="/diagnose"
					icon={<TroubleshootIcon />}
					LinkComponent={Link}
					href="/diagnose"
				/>
				<BottomNavigationAction
					label="Wiki"
					value="/search"
					icon={<SearchIcon />}
					LinkComponent={Link}
					href="/search"
				/>
			</BottomNavigation>
		</Paper>
	);
};

export default BottomNav;
