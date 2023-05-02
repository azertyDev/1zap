import { GetServerSideProps } from 'next';

import { Layout } from 'components/layout/client';
import { Container } from 'components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ClientCenterMain } from 'src/components/pages/center/client/main';
import { NextPageWithLayout } from '../_app';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['header', 'common', 'footer', 'center'])),
        },
    };
};

const ClientCenter: NextPageWithLayout = () => {
    return <ClientCenterMain />;
};

ClientCenter.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Container>{page}</Container>
        </Layout>
    );
};
export default ClientCenter;
