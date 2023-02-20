import {GetServerSideProps} from 'next';
import type {NextPageWithLayout} from './_app';

import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {RequestVimComp} from "components/pages/request_vim";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {locale} = context;

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

const Request_vim: NextPageWithLayout = () => {
    return <RequestVimComp/>;
};

export default Request_vim;
