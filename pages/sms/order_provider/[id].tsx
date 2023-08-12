import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { IProductGroup } from 'types';
import { SmsOrder } from 'components/pages/sms/order';
import { Layout } from 'components/layout/client';

import { NextPageWithLayout } from '../../_app';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['header', 'footer', 'common', 'helpers', 'sms'])),
        },
    };
};

const SmsOrderPage: NextPageWithLayout<{ data: { data: IProductGroup[]; totalPages: number } }> = ({ data }) => {
    return <SmsOrder />;
};

SmsOrderPage.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>;
};
export default SmsOrderPage;
