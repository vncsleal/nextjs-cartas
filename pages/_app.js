import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { createContext } from "react";
import App from 'next/app';
import Head from 'next/head';
import { getStrapiMedia } from '../lib/media';
import { fetchAPI } from '../lib/api';

export const GlobalContext = createContext({});

function MyApp({ Component, pageProps }) {
	const { global } = pageProps;
	return (
		<>
			<Head>
				<link
					rel='shortcut icon'
					href={getStrapiMedia(global.attributes.favicon)}
				/>
			</Head>
			<ThemeProvider attribute='class'>
				<GlobalContext.Provider value={global.attributes}>
					<Component {...pageProps} />
				</GlobalContext.Provider>
			</ThemeProvider>
		</>
	);
}

MyApp.getInitialProps = async (ctx) => {
	// Calls page's `getInitialProps` and fills `appProps.pageProps`
	const appProps = await App.getInitialProps(ctx);
	// Fetch global site settings from Strapi
	const globalRes = await fetchAPI("/global", {
		populate: {
			favicon: "*",
			defaultSeo: {
				populate: "*",
			},
		},
	});
	// Pass the data to our page via props
	return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;
