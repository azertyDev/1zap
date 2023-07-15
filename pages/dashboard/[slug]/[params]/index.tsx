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
import { ProfileEditProvider } from 'src/components/pages/dashboard/admin/sections/providers/profile';
import { RequisitesEditProvider } from 'components/pages/dashboard/admin/sections/providers/requisites';
import { BranchesEditProvider } from 'components/pages/dashboard/admin/sections/providers/branch';
import { EditBranchByProvider } from 'components/pages/dashboard/admin/sections/providers/edit_branch';
import { ViewProviderBalance } from 'components/pages/dashboard/admin/sections/providers/balance';
import { ViewPriceLists } from 'components/pages/dashboard/admin/sections/providers/price_lists';
import { ViewPriceList } from 'components/pages/dashboard/admin/sections/providers/price_list';
import { AddProviderBranch } from 'src/components/pages/dashboard/admin/sections/providers/add_branch';

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
    profile_provider: '/providers/profile',
    requisites_provider: '/providers/requisites',
    branches_provider: '/providers/branch',
    edit_branches_provider: '/providers/edit_branch',
    // add_new_branch: '/providers/new_branch',
    view_balance: '/providers/balance',
    view_price_lists: '/providers/price_lists',
    view_price_list: '/providers/price_list',
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
        case routes.profile_provider:
            return <ProfileEditProvider />;
        case routes.requisites_provider:
            return <RequisitesEditProvider />;
        case routes.branches_provider:
            return <BranchesEditProvider />;
        case routes.edit_branches_provider:
            return <EditBranchByProvider />;
        // case routes.add_new_branch:
        //     return <AddProviderBranch />;
        case routes.view_balance:
            return <ViewProviderBalance />;
        case routes.view_price_lists:
            return <ViewPriceLists />;
        case routes.view_price_list:
            return <ViewPriceList />;
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
