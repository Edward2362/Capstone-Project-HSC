import { RequireAdminAuth } from "@/components/RequireAdminAuth";
import { RootLayout } from "@/components/RootLayout";
import { RouteLoading } from "@/components/RouteLoading";
import "@/styles/globals.scss";
import theme from "@/styles/theme/theme";
import createEmotionCache from "@/utils/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

export default function App({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps,
}: MyAppProps) {
	return (
		<>
			<Head>
				<title>Health Symptom Checker</title>
				<meta
					name="description"
					content="Health Symptom Checker web app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/HSC-logo-small.svg" />
			</Head>

			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<SessionProvider session={pageProps.session}>
					<CacheProvider value={emotionCache}>
						<ThemeProvider theme={theme}>
							{/* Prompt for develop env */}
							<RequireAdminAuth />
							<RouteLoading />
							<CssBaseline />

							<RootLayout>
								<Component {...pageProps} />
							</RootLayout>
						</ThemeProvider>
					</CacheProvider>
				</SessionProvider>
			</LocalizationProvider>
		</>
	);
}
