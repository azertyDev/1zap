import { GetServerSideProps } from 'next';

import { Layout } from 'components/layout/client';
import { Container } from 'components/ui/container';
import { Home } from 'src/components/pages/home';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPageWithLayout } from '../_app';
import { Details } from 'components/pages/details/main';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale as string, [
                'header',
                'common',
                'footer',
                'home',
                'filter'
            ])),
        },
    };
};

const DetailsPage: NextPageWithLayout = () => {
    return <Details />;
};

DetailsPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default DetailsPage;
