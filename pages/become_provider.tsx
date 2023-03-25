import { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from './_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { BecomeProviderComp } from 'components/pages/become_provider';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale as string, [
                'header',
                'common',
                'footer',
                'home',
                'filter',
                'select',
                'helpers',
            ])),
        },
    };
};

const BecomeProvider: NextPageWithLayout = () => {
    return <BecomeProviderComp />;
};

export default BecomeProvider;
