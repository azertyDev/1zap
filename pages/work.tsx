import { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from './_app';

import { Layout } from 'components/layout/client';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { productsApi } from 'src/utils/api';
import { IProductGroup } from '../types';

import { WorkPage } from 'components/pages/about_us/work';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        locale,
        query: { page },
    } = context;

    let data = await productsApi
        .getProductsWithGroup('tires', `?page=${page ?? 1}`)
        .then((res) => res)
        .catch((err) => null);

    return {
        props: {
            data: data,
            ...(await serverSideTranslations(locale as string, ['header', 'common', 'footer', 'about'])),
        },
    };
};

const TirePage: NextPageWithLayout<{ data: { data: IProductGroup[]; totalPages: number } }> = ({ data }) => {
    return <WorkPage />;
};

TirePage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default TirePage;
