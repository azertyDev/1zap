import { GetServerSideProps } from 'next';

import { Layout } from 'components/layout/client';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { NextPageWithLayout } from '../../../../_app';
import { ChosenDetail } from 'components/pages/details/chosen_detail';
import { getLaximoData } from 'src/function/getLaximoData';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        locale,
        query: { Catalog, Vid, sd, unit },
    } = context;

    return {
        props: {
            dataAuto: await getLaximoData(
                `GetVehicleInfo:Locale=ru_RU|Catalog=${Catalog}|VehicleId=${Vid}|ssd=${sd}|Localized=true`
            ),
            dataListImg: await getLaximoData(
                `ListImageMapByUnit:Catalog=${Catalog}|UnitId=${unit}|ssd=${sd}|WithLinks=true`
            ),
            dataDetailByUnit: await getLaximoData(
                `ListDetailByUnit:Locale=ru_RU|Catalog=${Catalog}|UnitId=${unit}|ssd=${sd}|Localized=true|WithLinks=true`
            ),
            dataGetUnitInfo: await getLaximoData(
                ` GetUnitInfo:Locale=ru_RU|Catalog=${Catalog}|UnitId=${unit}|ssd=${sd}|Localized=true`
            ),
            ...(await serverSideTranslations(locale as string, ['header', 'common', 'footer', 'home', 'filter'])),
        },
    };
};

const DetailsPageChosenDetails: NextPageWithLayout<{
    dataAuto: string;
    dataDetailByUnit: string;
    dataGetUnitInfo: string;
}> = ({ dataAuto, dataDetailByUnit, dataGetUnitInfo }) => {
    return <ChosenDetail dataAuto={dataAuto} dataDetailByUnit={dataDetailByUnit} dataGetUnitInfo={dataGetUnitInfo} />;
};

DetailsPageChosenDetails.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default DetailsPageChosenDetails;
