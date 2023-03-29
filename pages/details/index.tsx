import { GetServerSideProps } from 'next';

import { Layout } from 'components/layout/client';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPageWithLayout } from '../_app';
import { Details } from 'components/pages/details/main';
import { getLaximoData } from 'src/function/getLaximoData';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        locale,
        query: { FindVehicle, brand, model, region, year },
    } = context;

    return {
        props: {
            dataResultVehicle:
                year || model || region
                    ? await getLaximoData(
                          ` FindVehicleByWizard2:Locale=ru_RU|Catalog=${brand}|ssd=${
                              year || model || region
                          }|Localized=true`
                      )
                    : null,
            dataYear:
                model || region
                    ? await getLaximoData(`GetWizard2:Locale=ru_RU|Catalog=${brand}|ssd=${model ? model : region}`)
                    : null,
            dataFilterFirstLevel: brand ? await getLaximoData(`GetWizard2:Locale=ru_RU|Catalog=${brand}|ssd=`) : null,
            dataFind: FindVehicle ? await getLaximoData(`FindVehicle:Locale=ru_RU|IdentString=${FindVehicle}`) : null,
            dataCatalog: await getLaximoData(`ListCatalogs:Locale=en_US|ssd=`),
            ...(await serverSideTranslations(locale as string, ['header', 'common', 'footer', 'home'])),
        },
    };
};

const DetailsPage: NextPageWithLayout<{
    dataFind: string;
    dataCatalog: string;
    dataFilterFirstLevel: string;
    dataYear: string;
    dataResultVehicle: string;
}> = ({ dataFind, dataCatalog, dataFilterFirstLevel, dataYear, dataResultVehicle }) => {
    return (
        <Details
            dataFind={dataFind}
            dataCatalog={dataCatalog}
            dataFilterFirstLevel={dataFilterFirstLevel}
            dataYear={dataYear}
            dataResultVehicle={dataResultVehicle}
        />
    );
};

DetailsPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default DetailsPage;
