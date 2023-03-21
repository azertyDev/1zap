import { GetServerSideProps } from 'next';

import { Layout } from 'components/layout/client';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPageWithLayout } from '../_app';
import { Details } from 'components/pages/details/main';
import { getLaximoData } from 'src/function/getLaximoData';
import { useEffect, useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        locale,
        query: { FindVehicle, getCatalog, brand, ssd },
    } = context;

    const propsObj = {
        props: {
            dataCatalog: await getLaximoData(`ListCatalogs:Locale=en_US|ssd=`),
            ...(await serverSideTranslations(locale as string, ['header', 'common', 'footer', 'home', 'filter'])),
        },
    };

    if (brand) {
        // @ts-ignore
        propsObj.props.dataWizard = await getLaximoData(
            `GetWizard2:Locale=ru_RU|Catalog=${brand}|ssd=$*KwFJdWVqOig5OjQoMCljYGU-KU88IAFfEUNBVVlAXzE0PjgzAAASDRsRCR5YR11jYGAzPzIyWQcgAAAAAFGB5-Y=$`
        );
    } else {
        // @ts-ignore
        propsObj.props.dataWizard = null;
    }
    return propsObj;

    // {
    //     props: {
    //         getWizard:getWizard? await getLaximoData(`GetWizard2:Locale=ru_RU|Catalog=${'GM_C201809'}|ssd=`):null,
    //             dataFind: FindVehicle ? await getLaximoData(`FindVehicle:Locale=ru_RU|IdentString=${FindVehicle}`) : null,
    //     },
    // };
};

const DetailsPage: NextPageWithLayout<{ dataFind: string; dataCatalog: string; dataWizard: string }> = ({
    dataFind,
    dataCatalog,
    dataWizard,
}) => {
    return <Details dataFind={dataFind} dataCatalog={dataCatalog} dataWizard={dataWizard} />;
};

DetailsPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default DetailsPage;
