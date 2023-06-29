import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { IProductGroup } from 'types';
import { SmsOrder } from 'components/pages/sms/order';
import { Layout } from 'components/layout/client';
import { Container } from 'components/ui/container';
import { NextPageWithLayout } from '../../_app';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale as string, [
                'header',
                'footer',
                'home',
                'common',
                'helpers',
                'dashboard',
            ])),
        },
    };
};

const SmsOrderPage: NextPageWithLayout<{ data: { data: IProductGroup[]; totalPages: number } }> = ({ data }) => {
    return <SmsOrder />;
};

SmsOrderPage.getLayout = function getLayout(page: any) {
    return (
        <Layout>
            <Container>{page}</Container>
        </Layout>
    );
};
export default SmsOrderPage;
