import { ICustomer } from "@/utils/interface/Customer";
import { Session } from "next-auth";

export const get = (endpoint: string, data: any) => {
	return fetch(process.env.NEXT_PUBLIC_API_BASE + endpoint, {
		method: "GET",
		body: JSON.stringify(data),
	});
};

export const getQuery = (endpoint: string) => {
	return fetch(process.env.NEXT_PUBLIC_API_BASE + endpoint, {
		method: "GET",
	});
};

export const getAuth = (endpoint: string, token: string) => {
	return fetch(process.env.NEXT_PUBLIC_API_BASE + endpoint, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
		},
	});
};

export const getUserInfo = async (session: Session) => {
	let res = await getAuth(
		"/auth/me?include=DIAGNOSIS_HISTORY",
		session.user.accessToken
	);
	if (res.status === 401) {
		const reqData = { refreshToken: session.user.refreshToken };
		let refreshTokenRes;
		refreshTokenRes = await post("/auth/refresh", reqData);
		if (!refreshTokenRes.ok) {
			return null;
		}
		const refreshTokenData = (await refreshTokenRes.json()) as {
			accessToken: string;
			refreshToken: string;
		};
		session.user.accessToken = refreshTokenData.accessToken;
		session.user.refreshToken = refreshTokenData.refreshToken;
		res = await getAuth(
			"/auth/me?include=DIAGNOSIS_HISTORY",
			session?.user?.accessToken
		);
	} else if (!res.ok) {
		return null;
	}
	return (await res.json()) as ICustomer;
};

export const post = (endpoint: string, data: any) => {
	return fetch(process.env.NEXT_PUBLIC_API_BASE + endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};

export const postAuth = (
	endpoint: string,
	data: any,
	token: string | undefined
) => {
	return fetch(process.env.NEXT_PUBLIC_API_BASE + endpoint, {
		method: "POST",
		headers: {
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};

export const patch = (session: Session, endpoint: string, data: any) => {
	return fetch(process.env.NEXT_PUBLIC_API_BASE + endpoint, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + session?.user?.accessToken,
		},
		body: JSON.stringify(data),
	});
};
