import { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from './_app';

import { Layout } from 'components/layout/client';
import { Container } from 'components/ui/container';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PageWrapper } from 'components/ui/page_wrapper';
import { Oil } from 'components/pages/oil';
import { productsApi } from 'src/utils/api';
import {IProductGroup} from "../types";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        locale,
        query: { page },
    } = context;

    let data = await productsApi
        .getProductsWithGroup('oils', `?page=${page ?? 1}`)
        .then((res) => res)
        .catch((err) => null);

    return {
        props: {
            data: data,
            ...(await serverSideTranslations(locale as string, ['header', 'footer', 'home', 'common', 'helpers'])),
        },
    };
};

const OilPage: NextPageWithLayout<{ data: { data: IProductGroup[]; totalPages: number } }> = ({ data }) => {
    return <Oil data={data} />;
};

OilPage.getLayout = function getLayout(page) {
    return (
        <Layout>
            <PageWrapper>
                <Container>{page}</Container>
            </PageWrapper>
        </Layout>
    );
};
export default OilPage;
