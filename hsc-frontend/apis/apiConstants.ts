export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE;
const VERCEL_DOMAIN = process.env.NEXT_PUBLIC_VERCEL_URL;
const VERCEL_URL = VERCEL_DOMAIN ? `https://${VERCEL_DOMAIN}` : null;
export const NEXT_BASE_URL =
	process.env.NEXT_PUBLIC_BASE_URL || VERCEL_URL || "http://localhost:3000";
