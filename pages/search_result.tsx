import { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from './_app';

import { Layout } from 'components/layout/client';
import { Container } from 'components/ui/container';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SearchResult } from 'components/pages/search_result';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale as string, [
                'header',
                'common',
                'footer',
                'home',
            ])),
        },
    };
};

const SearchResultPage: NextPageWithLayout = () => {
    return <SearchResult />;
};

SearchResultPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default SearchResultPage;
