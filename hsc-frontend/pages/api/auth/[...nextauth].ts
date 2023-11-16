import { authApi } from "@/apis/authApi";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials, _request) {
				try {
					if (!credentials) return null;

					const { email, password } = credentials;
					const data = await authApi.login({
						email,
						password,
					});

					return data as any;
				} catch (error) {
					return null;
				}
			},
		}),
	],

	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (trigger === "update") {
				return { ...token, ...session.user };
			}
			return { ...token, ...user };
		},

		async session({ session, token }) {
			session.user = token as any;
			return session;
		},
	},

	secret: process.env.NEXTAUTH_SECRET,

	pages: {
		signIn: "/login",
	},
};

export default NextAuth(authOptions);
