import { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from '../_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RequestVimComp } from 'components/pages/request_vim/step_one';
import { getLaximoData } from 'src/function/getLaximoData';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        locale,
        query: { brand },
    } = context;

    return {
        props: {
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

const Index: NextPageWithLayout<{ dataCatalog: string; dataModel: string }> = ({ dataCatalog, dataModel }) => {
    return <RequestVimComp dataCatalog={dataCatalog} dataModel={dataModel} />;
};

export default Index;
