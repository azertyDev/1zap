import type { NextPageWithLayout } from '../_app';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DashboardContent from 'src/components/pages/dashboard';
import { Layout } from 'src/components/layout/admin';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            query: context.query,
            ...(await serverSideTranslations(locale as string, [
                'header',
                'common',
                'footer',
                'home',
            ])),
        },
    };
};

const Dashboard: NextPageWithLayout = (props: any) => {
    return <DashboardContent {...props} />;
};

Dashboard.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Dashboard;
