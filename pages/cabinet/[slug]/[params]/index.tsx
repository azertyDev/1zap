import type { NextPageWithLayout } from 'pages/_app';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from 'src/components/layout/dashboard';
import { MainInnerPages } from 'components/pages/dashboard/cabinet/sections/main/sub_pages';
import { PromoInnerPages } from 'components/pages/dashboard/cabinet/sections/promo/forms';
import { PriceListEdit } from 'components/pages/dashboard/cabinet/sections/price_list/edit';

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
    main: '/main',
    promo: '/promo',
    edit_price_list: '/price-list',
};

const Index: NextPageWithLayout = ({ query }: any) => {
    switch (`/${query.slug}`) {
        case routes.promo:
            return <PromoInnerPages subPage={query.params} />;
        case routes.main:
            return <MainInnerPages subPage={query.params} />;
        case routes.edit_price_list:
            return <PriceListEdit />;
        default:
            return <div>Страница не найдена</div>;
    }
};

Index.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Index;
