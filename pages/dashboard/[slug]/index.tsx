import type { NextPageWithLayout } from 'pages/_app';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { Layout } from 'src/components/layout/dashboard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const DynamicDashboardContent = dynamic(() => import('src/components/pages/dashboard/admin'), {
    ssr: false,
});

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale as string, [
                'header',
                'dashboard',
                'common',
                'footer',
                'home',
                'helpers',
            ])),
        },
    };
};

const Dashboard: NextPageWithLayout = (props: any) => {
    return <DynamicDashboardContent {...props} />;
};

Dashboard.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Dashboard;
