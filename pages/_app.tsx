import type { AppProps } from 'next/app';

import '../styles/globals.scss';

import { Montserrat } from '@next/font/google';

import Head from 'next/head';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { appWithTranslation } from 'next-i18next';

const montserrat = Montserrat({
    subsets: ['latin'],
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <>
            <Head>
                <title>1Zap</title>
                <meta name="description" content="Купи и сравни" />
                <link rel="icon" href="/assets/favicon/favicon.ico" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/assets/favicon/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/assets/favicon/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/assets/favicon/favicon-16x16.png"
                />

                <meta name="theme-color" content="#ee3300" />
            </Head>
            <style jsx global>{`
                html {
                    font-family: ${montserrat.style.fontFamily};
                }
            `}</style>
            {getLayout(<Component {...pageProps} />)}
        </>
    );
}

export default appWithTranslation(MyApp);
