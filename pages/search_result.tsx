import { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from './_app';

import { Layout } from 'components/layout/client';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SearchResult } from 'components/pages/search_result';
import { staticParamsApi } from 'src/utils/api';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;
    const staticPar = await staticParamsApi
        .getParams()
        .then((res) => res)
        .catch((err) => null);

    const filteredParam = staticPar
        ? {
              payment: [{ value: null, label: 'all' }, ...staticPar.payment],
              delivery: [{ value: null, label: 'all' }, ...staticPar.delivery],
              service: [{ value: null, label: 'all' }, ...staticPar.service],
              client: [{ value: null, label: 'all' }, ...staticPar.client],
          }
        : null;

    return {
        props: {
            staticPar: filteredParam,
            ...(await serverSideTranslations(locale as string, ['header', 'common', 'footer', 'home', 'helpers'])),
        },
    };
};

const SearchResultPage: NextPageWithLayout<{ staticPar: IStaticParams }> = ({ staticPar }) => {
    return <SearchResult staticPar={staticPar} />;
};

SearchResultPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default SearchResultPage;
