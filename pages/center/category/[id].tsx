import { GetServerSideProps } from 'next';

import { Layout } from 'components/layout/client';
import { Container } from 'components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { NextPageWithLayout } from '../../_app';
import { ClientCenterCategory } from 'components/pages/center/client/category';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['header', 'common', 'footer', 'center'])),
        },
    };
};

const ClientCenterCategories: NextPageWithLayout = () => {
    return <ClientCenterCategory />;
};

ClientCenterCategories.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Container>{page}</Container>
        </Layout>
    );
};
export default ClientCenterCategories;
