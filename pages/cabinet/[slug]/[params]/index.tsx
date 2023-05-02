import type { NextPageWithLayout } from 'pages/_app';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from 'src/components/layout/dashboard';
import Header from 'src/components/ui/dashboard/header';
import { BranchForm } from 'src/components/pages/dashboard/cabinet/sections/promo/forms/branch_form';
import { MainInnerPages } from 'src/components/pages/dashboard/cabinet/sections/main/sub_pages';

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
    promo: '/promo',
    main: '/main',
};

const Index: NextPageWithLayout = ({ query }: any) => {
    switch (`/${query.slug}`) {
        case routes.promo:
            return <BranchForm />;
        case routes.main:
            return <MainInnerPages subPage={query.params} />;

        default:
            return <div>Страница не найдена</div>;
    }
};

Index.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Index;
