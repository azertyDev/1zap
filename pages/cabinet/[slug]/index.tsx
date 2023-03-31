import type { NextPageWithLayout } from 'pages/_app';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from 'src/components/layout/dashboard';
import dynamic from 'next/dynamic';

const ClientContent = dynamic(() => import('src/components/pages/dashboard/cabinet'), {
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
    return <ClientContent {...props} />;
};

Dashboard.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Dashboard;
