import { GetServerSideProps } from 'next';

import { Layout } from 'components/layout/client';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { DetailsChosenCategories } from 'components/pages/details/chosen_category';
import { getLaximoData } from 'src/helpers/getLaximoData';
import { NextPageWithLayout } from '../../_app';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        locale,
        query: { Catalog, Vid, sd, id },
    } = context;

    return {
        props: {
            dataAuto: await getLaximoData(
                `GetVehicleInfo:Locale=ru_RU|Catalog=${Catalog}|VehicleId=${Vid}|ssd=${sd}|Localized=true`
            ),
            dataList: await getLaximoData(
                `ListQuickDetail:Locale=ru_RU|Catalog=${Catalog}|VehicleId=${Vid}|QuickGroupId=${id}|ssd=${sd}|Localized=true`
            ),
            ...(await serverSideTranslations(locale as string, ['header', 'common', 'footer', 'home', 'filter'])),
        },
    };
};

const DetailsPageChosenCategory: NextPageWithLayout<{ dataList: string; dataAuto: string }> = ({
    dataList,
    dataAuto,
}) => {
    return <DetailsChosenCategories dataAuto={dataAuto} dataList={dataList} />;
};

DetailsPageChosenCategory.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default DetailsPageChosenCategory;
