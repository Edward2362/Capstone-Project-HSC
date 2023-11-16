import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const ADMIN_PROMPT = "Please confirm that you are an HSC developer:";
const ADMIN_KEY = "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "adminHSC";

const developerPrompt = (): void => {
	let isPasswordCorrect;
	do {
		const password = prompt(ADMIN_PROMPT);
		isPasswordCorrect = password === ADMIN_PASSWORD;
	} while (!isPasswordCorrect);
};

export const RequireAdminAuth = () => {
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const localPassword = localStorage.getItem(ADMIN_KEY);
		let isDeveloper = localPassword === ADMIN_PASSWORD;
		setIsAdmin(isDeveloper);

		if (!isDeveloper) {
			developerPrompt();
			localStorage.setItem(ADMIN_KEY, ADMIN_PASSWORD);
			setIsAdmin(true);
		}
	}, []);

	if (isAdmin) return null;

	return (
		<Box
			className="bg-pattern"
			sx={{
				position: "fixed",
				inset: 0,
				zIndex: 999999,
			}}
		/>
	);
};
