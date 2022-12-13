import type {AppProps} from "next/app";

import "../styles/globals.scss";


import {Montserrat} from "@next/font/google";

import Head from "next/head";


const montserrat = Montserrat({
    subsets: ["latin"],
});

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>1Zap</title>
                <meta name="description" content="Купи и сравни"/>
                <link rel="icon" href="/images/favicon/favicon.ico"/>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/images/favicon/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/images/favicon/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/images/favicon/favicon-16x16.png"
                />
                <meta name="theme-color" content="#ee3300"/>
            </Head>
            <style jsx global>{`
              html {
                font-family: ${montserrat.style.fontFamily};
              }
            `}</style>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
