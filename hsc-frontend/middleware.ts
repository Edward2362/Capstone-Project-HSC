import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	const isAuthenticated = !!token;

	const publicPaths = ["/about-us"];
	const isCurrentPathPublic = publicPaths.some((path) =>
		pathname.startsWith(path)
	);
	if (isCurrentPathPublic) {
		return NextResponse.next();
	}

	const requireNotAuthPaths = [
		"/login",
		"/register",
		"/forgot-password",
		"/reset-password",
	];
	const isCurrentPathRequireNotAuth =
		pathname === "/" ||
		requireNotAuthPaths.some((path) => pathname.startsWith(path));
	const isCurrentPathRequireAuth = !isCurrentPathRequireNotAuth;

	if (isCurrentPathRequireNotAuth && isAuthenticated) {
		return NextResponse.redirect(new URL("/profile", req.url));
	} else if (isCurrentPathRequireAuth && !isAuthenticated) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/",
		"/login",
		"/register",
		"/forgot-password",
		"/reset-password",
		"/diagnose",
		"/diseases/:path*",
		"/profile",
		"/search",
		"/settings",
		"/change-password",
		"/about-us",
		"/diagnosis-history/:path*",
	],
};
