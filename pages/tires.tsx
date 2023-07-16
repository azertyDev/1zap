import { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from './_app';

import { Layout } from 'components/layout/client';
import { Container } from 'components/ui/container';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PageWrapper } from 'components/ui/page_wrapper';

import { Tires } from 'components/pages/tires';
import { productsApi } from 'src/utils/api';
import { IProductGroup } from '../types';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        locale,
        query: { page, manufacturers, seasons, widths, heights, diameters, average },
    } = context;

    let data = await productsApi
        .getProductsWithGroup(
            'tires',
            `?page=${page ?? 1}${manufacturers ? `&manufacturer=${manufacturers}` : ''}${
                seasons ? `&season=${seasons}` : ''
            }${widths ? `&width=${widths}` : ''}${heights ? `&height=${heights}` : ''}${
                diameters ? `&diameter=${diameters}` : ''
            }${average ? `&average=${average}` : ''}`
        )
        .then((res) => res)
        .catch((err) => null);

    return {
        props: {
            data: data,
            ...(await serverSideTranslations(locale as string, ['header', 'common', 'footer', 'home', 'helpers'])),
        },
    };
};

const TirePage: NextPageWithLayout<{ data: { data: IProductGroup[]; totalPages: number } }> = ({ data }) => {
    return <Tires data={data} />;
};

TirePage.getLayout = function getLayout(page) {
    return (
        <Layout>
            <PageWrapper>
                <Container>{page}</Container>
            </PageWrapper>
        </Layout>
    );
};
export default TirePage;
