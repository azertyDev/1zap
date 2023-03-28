import type { AppProps } from 'next/app';
import Head from 'next/head';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { appWithTranslation } from 'next-i18next';
import { Toaster } from 'react-hot-toast';

import '../styles/libraries/map.scss';
import '../styles/libraries/pagination.scss';
import '../styles/libraries/react_select.scss';
import '../styles/libraries/home_partners_swiper.scss';
import 'react-responsive-modal/styles.css';
import 'swiper/css';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import '../styles/globals.scss';

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
                <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />

                <meta name="theme-color" content="#ee3300" />
            </Head>
            <Toaster position="top-right" />
            {getLayout(<Component {...pageProps} />)}
        </>
    );
}

export default appWithTranslation(MyApp);
