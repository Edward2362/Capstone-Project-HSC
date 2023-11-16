import { ApiError } from "@/apis/ApiError";

export const httpRequest = {
	get: async (url: string, init?: RequestInit) => {
		const response = await fetch(url, {
			...init,
			method: "GET",
			cache: "no-store",
		});

		const responseText = await response.text();
		if (!response.ok) {
			throw new ApiError(response.status, responseText);
		}
		if (!responseText) return null;

		return JSON.parse(responseText);
	},

	post: async <T>(url: string, data: T, init?: RequestInit) => {
		let headers = init?.headers || {};
		const response = await fetch(url, {
			...init,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...headers,
			},
			body: JSON.stringify(data),
		});

		const responseText = await response.text();
		if (!response.ok) {
			throw new ApiError(response.status, responseText);
		}
		if (!responseText) return null;

		return JSON.parse(responseText);
	},

	patch: async <T>(url: string, data: T, init?: RequestInit) => {
		let headers = init?.headers || {};
		const response = await fetch(url, {
			...init,
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				...headers,
			},
			body: JSON.stringify(data),
		});

		const responseText = await response.text();
		if (!response.ok) {
			throw new ApiError(response.status, responseText);
		}
		if (!responseText) return null;

		return JSON.parse(responseText);
	},

	delete: async (url: string, init?: RequestInit) => {
		const response = await fetch(url, {
			method: "DELETE",
			...init,
		});

		const responseText = await response.text();
		if (!response.ok) {
			throw new ApiError(response.status, responseText);
		}
		if (!responseText) return null;

		return JSON.parse(responseText);
	},
};
