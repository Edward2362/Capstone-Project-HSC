import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const DiagnoseHistoryDetails = () => {
	const router = useRouter();
	useEffect(() => {
		router.replace("/404");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <Loading />;
};

export default DiagnoseHistoryDetails;
