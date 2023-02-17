import {GetServerSideProps} from 'next';

import {Layout} from 'components/layout/client';

import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import {NextPageWithLayout} from "../../../_app";
import {DetailsChosenCategories} from "components/pages/details/chosen_category";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {locale} = context;

    return {
        props: {
            ...(await serverSideTranslations(locale as string, [
                'header',
                'common',
                'footer',
                'home',
                'filter'
            ])),
        },
    };
};

const DetailsPageChosenCategory: NextPageWithLayout = () => {
    return <DetailsChosenCategories/>;
};

DetailsPageChosenCategory.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default DetailsPageChosenCategory;
