import { ICustomer } from "@/utils/interface/Customer";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			user: ICustomer;
			refreshToken: string;
			accessToken: string;
		};
	}
}
