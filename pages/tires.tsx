import {GetServerSideProps} from 'next';
import type {NextPageWithLayout} from './_app';

import {Layout} from 'components/layout/client';
import {Container} from 'components/ui/container';


import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {PageWrapper} from "components/ui/page_wrapper";

import {Tires} from "components/pages/tires";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {locale} = context;

    return {
        props: {
            ...(await serverSideTranslations(locale as string, [
                'header',
                'common',
                'footer',
                'home',
                "filter"
            ])),
        },
    };
};

const TirePage: NextPageWithLayout = () => {
    return <Tires/>;
};

TirePage.getLayout = function getLayout(page) {
    return (
        <Layout>
            <PageWrapper>
                <Container>
                    {page}
                </Container>
            </PageWrapper>
        </Layout>
    );
};
export default TirePage;
