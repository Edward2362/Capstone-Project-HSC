import ProgressBar from "@/components/ProgressBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const RouteLoading = () => {
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const handleRouteChangeStart = () => {
			setIsLoading(true);
		};
		const handleRouteChangeStop = () => {
			setIsLoading(false);
		};

		router.events.on("routeChangeStart", handleRouteChangeStart);
		router.events.on("routeChangeComplete", handleRouteChangeStop);
		router.events.on("routeChangeError", handleRouteChangeStop);

		return () => {
			router.events.off("routeChangeStart", handleRouteChangeStart);
			router.events.off("routeChangeComplete", handleRouteChangeStop);
			router.events.off("routeChangeError", handleRouteChangeStop);
		};
	}, [router.events]);

	return <ProgressBar isLoading={isLoading} />;
};
