import type { NextPageWithLayout } from 'pages/_app';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from 'src/components/layout/admin';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const DynamicDashboardContent = dynamic(() => import('src/components/pages/dashboard'), {
    ssr: false,
});

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['header', 'dashboard', 'common', 'footer', 'home'])),
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
