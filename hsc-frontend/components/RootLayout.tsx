import BottomNav from "@/components/BottomNav";
import HeadNav from "@/components/HeadNav";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export const RootLayout = ({ children }: Props) => {
	const router = useRouter();

	const notAuthedLayoutPages = [
		"/",
		"/login",
		"/register",
		"/reset-password",
		"/forgot-password",
	];
	const authedLayoutPages = ["/profile", "/diagnose", "/search"];
	const needNotAuthedLayout = notAuthedLayoutPages.includes(router.pathname);
	const needAuthedLayout = authedLayoutPages.includes(router.pathname);

	return (
		<>
			{needNotAuthedLayout ? <HeadNav /> : null}
			{children}
			{needAuthedLayout ? <BottomNav /> : null}
		</>
	);
};
