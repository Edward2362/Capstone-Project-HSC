import { API_BASE_URL } from "@/apis/apiConstants";
import { httpRequest } from "@/apis/httpRequest";
import { ICustomer } from "@/utils/interface/Customer";

export type LoginRequest = {
	email: string;
	password: string;
};
export type LoginResponse = {
	user: ICustomer;
	refreshToken: string;
	accessToken: string;
};

export type RegisterRequest = {
	email: string;
	password: string;
};

export type ChangePasswordRequest = {
	oldPassword: string;
	newPassword: string;
};

export type MessageResponse = {
	message: string;
};

export type RefreshTokenRequest = {
	refreshToken: string;
};
export type RefreshTokenResponse = {
	refreshToken: string;
	accessToken: string;
};

export type ResetPasswordRequest = {
	newPassword: string;
};

export type ForgotPasswordRequest = {
	email: string;
};

export const authApi = {
	login: async (requestData: LoginRequest) => {
		const loginData = await httpRequest.post(
			API_BASE_URL + "/auth/login",
			requestData
		);
		return loginData as LoginResponse;
	},
	register: async (requestData: RegisterRequest) => {
		const responseData = await httpRequest.post(
			API_BASE_URL + "/auth/register",
			requestData
		);
		return responseData as MessageResponse;
	},
	changePassword: async (
		requestData: ChangePasswordRequest,
		authToken: string
	) => {
		const responseData = await httpRequest.patch(
			API_BASE_URL + "/auth/password",
			requestData,
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			}
		);
		return responseData as MessageResponse;
	},
	logout: async (authToken: string) => {
		const responseData = await httpRequest.delete(
			API_BASE_URL + "/auth/logout",
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			}
		);
		return responseData as MessageResponse;
	},
	getCurrentUser: async (authToken: string) => {
		const responseData = await httpRequest.get(API_BASE_URL + "/auth/me", {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
		return responseData as ICustomer;
	},
	refreshToken: async (
		requestData: RefreshTokenRequest,
		authToken: string
	) => {
		const responseData = await httpRequest.post(
			API_BASE_URL + "/auth/refresh",
			requestData,
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			}
		);
		return responseData as RefreshTokenResponse;
	},
	resetPassword: async (
		requestData: ResetPasswordRequest,
		resetToken: string
	) => {
		const responseData = await httpRequest.post(
			API_BASE_URL + "/auth/reset-password?token=" + resetToken,
			requestData
		);
		return responseData as null;
	},
	forgotPassword: async (requestData: ForgotPasswordRequest) => {
		const responseData = await httpRequest.post(
			API_BASE_URL + "/auth/forgot-password",
			requestData
		);
		return responseData as null;
	},
};
