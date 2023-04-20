import type { NextPageWithLayout } from 'pages/_app';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from 'src/components/layout/dashboard';
import Header from 'src/components/ui/dashboard/header';
import Bottom_footer from 'src/components/widgets/footer/bottom_footer';
import { BranchForm } from 'src/components/pages/dashboard/cabinet/sections/promo/forms/branch_form';
import { AdvForm } from 'src/components/pages/dashboard/cabinet/sections/promo/forms/adv_form';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale, query } = context;

    return {
        props: {
            query,
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

const routes = {
    promo_branches: '/promo/branches',
    promo_adv: '/promo/adverts',
};

const Index: NextPageWithLayout = ({ query }: any) => {
    switch (`/${query.slug}/${query.params}`) {
        case routes.promo_branches:
            return <BranchForm />;
        case routes.promo_adv:
            return <AdvForm />;

        default:
            break;
    }

    return <div>{query.id}</div>;
};

Index.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Header title={page.props.query.slug as string} />
            {page}
            <Bottom_footer />
        </Layout>
    );
};

export default Index;
