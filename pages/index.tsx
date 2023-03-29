import { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from './_app';

import { Layout } from 'components/layout/client';
import { Container } from 'components/ui/container';
import { Home } from 'src/components/pages/home';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getLaximoData } from 'src/function/getLaximoData';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            data: await getLaximoData('ListCatalogs:Locale=en_US|ssd='),
            ...(await serverSideTranslations(locale as string, [
                'header',
                'common',
                'footer',
                'home',
                'filter',
                'helpers',
            ])),
        },
    };
};

const HomePage: NextPageWithLayout<{ data: { dataRes: string } }> = ({ data }) => {
    return <Home data={data} />;
};

HomePage.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Container>{page}</Container>
        </Layout>
    );
};
export default HomePage;
