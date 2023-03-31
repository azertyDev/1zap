import { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { BecomeProviderComp } from 'components/pages/become_provider';
import { staticParamsApi } from 'src/utils/api';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    const staticPar = await staticParamsApi
        .getParams()
        .then((res) => res)
        .catch((err) => null);

    return {
        props: {
            staticPar: staticPar,
            ...(await serverSideTranslations(locale as string, ['header', 'common', 'footer', 'home', 'helpers'])),
        },
    };
};

const BecomeProvider: NextPageWithLayout<{ staticPar: IStaticParams }> = ({ staticPar }) => {
    return <BecomeProviderComp staticPar={staticPar} />;
};

export default BecomeProvider;
