import type { NextPageWithLayout } from 'pages/_app';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from 'src/components/layout/dashboard';
import { CreateProvider } from 'src/components/pages/dashboard/admin/sections/providers/create';
import { CenterSubPage } from 'components/pages/dashboard/admin/sections/center/sub_pages/subtopicts';
import { CenterForm } from 'components/pages/dashboard/admin/sections/center/sub_pages/form';
import { VinRequests } from 'components/pages/dashboard/admin/sections/vin_request';
import { EditPromoForm } from 'components/pages/dashboard/admin/sections/promo/edit';
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
    create_provider: '/providers/create',
    center_categories: '/center/category',
    center_form: '/center/form',
    vin_request_primary: '/vin-requests/primary',
    vin_request_completed: '/vin-requests/completed',
    edit_promo: '/promo/edit',
};

const Index: NextPageWithLayout = ({ query }: any) => {
    switch (`/${query.slug}/${query.params}`) {
        case routes.create_provider:
            return <CreateProvider query={query} />;
        case routes.center_categories:
            return <CenterSubPage query={query.id} />;
        case routes.center_form:
            return <CenterForm query={query} />;
        case routes.vin_request_primary:
            return <VinRequests query={query.params} />;
        case routes.vin_request_completed:
            return <VinRequests query={query.params} />;
        case routes.edit_promo:
            return <EditPromoForm query={query} />;
        default:
            break;
    }

    return <div>{query.id}</div>;
};

Index.getLayout = function getLayout(page) {
    return (
        <Layout>
            {/* <Header title={page.props.query.slug as string} /> */}
            {page}
            {/* <Bottom_footer /> */}
        </Layout>
    );
};

export default Index;
