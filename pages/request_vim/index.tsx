import { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RequestVimComp } from 'components/pages/request_vim/step_one';
import { getLaximoData } from 'src/function/getLaximoData';
import { staticParamsApi } from 'src/utils/api';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        locale,
        query: { brand },
    } = context;

    const staticPar = await staticParamsApi
        .getStatic()
        .then((res) => res)
        .catch((err) => null);

    return {
        props: {
            staticPar: staticPar,
            dataModel: brand ? await getLaximoData(`GetWizard2:Locale=ru_RU|Catalog=${brand}|ssd=`) : null,
            dataCatalog: await getLaximoData(`ListCatalogs:Locale=en_US|ssd=`),
            ...(await serverSideTranslations(locale as string, [
                'header',
                'common',
                'footer',
                'home',
                'filter',
                'select',
                'helpers',
            ])),
        },
    };
};

const Index: NextPageWithLayout<{ dataCatalog: string; dataModel: string; staticPar: IStaticParams }> = ({
    dataCatalog,
    dataModel,
    staticPar,
}) => {
    return <RequestVimComp dataCatalog={dataCatalog} dataModel={dataModel} staticPar={staticPar} />;
};

export default Index;
