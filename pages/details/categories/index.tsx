import { GetServerSideProps } from 'next';

import { Layout } from 'components/layout/client';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { NextPageWithLayout } from '../../_app';
import { DetailsCategories } from 'components/pages/details/categories';
import { getLaximoData } from 'src/helpers/getLaximoData';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        locale,
        query: { Catalog, Vid, sd },
    } = context;

    return {
        props: {
            dataAuto: await getLaximoData(
                `GetVehicleInfo:Locale=ru_RU|Catalog=${Catalog}|VehicleId=${Vid}|ssd=${sd}|Localized=true`
            ),
            dataList: await getLaximoData(
                `ListQuickGroup:Locale=ru_RU|Catalog=${Catalog}|VehicleId=${Vid}|ssd=${sd}|Localized=true`
            ),
            ...(await serverSideTranslations(locale as string, ['header', 'common', 'footer', 'home', 'filter'])),
        },
    };
};

const DetailsPageCategory: NextPageWithLayout<{ dataAuto: string; dataList: string }> = ({ dataAuto, dataList }) => {
    return <DetailsCategories dataAuto={dataAuto} dataList={dataList} />;
};

DetailsPageCategory.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default DetailsPageCategory;
