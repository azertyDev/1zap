import { GetServerSideProps } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPageWithLayout } from '../../_app';
import { RequestVimCompSec } from 'components/pages/request_vim/step_two';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale as string, [
                'header',
                'common',
                'footer',
                'home',
                'filter',
            ])),
        },
    };
};

const Index: NextPageWithLayout = () => {
    return <RequestVimCompSec />;
};

export default Index;
