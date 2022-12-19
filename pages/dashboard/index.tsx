import { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../_app';

import { Layout } from 'components/layout/client';
import { Container } from 'components/ui/container';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DashboardContent } from 'src/components/pages/dashboard';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale as string, [
                'header',
                'common',
                'footer',
                'home',
            ])),
        },
    };
};

const Dashboard: NextPageWithLayout = () => {
    return <DashboardContent />;
};

// HomePage.getLayout = function getLayout(page) {
//     return (
//         <Layout>
//             <Container>{page}</Container>
//         </Layout>
//     );
// };

export default Dashboard;
