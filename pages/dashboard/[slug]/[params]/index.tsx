import type { NextPageWithLayout } from 'pages/_app';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from 'src/components/layout/dashboard';
import { CreateProvider } from 'src/components/pages/dashboard/admin/sections/providers/create';
import Header from 'src/components/ui/dashboard/header';
import Bottom_footer from 'src/components/widgets/footer/bottom_footer';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale, query } = context;

    return {
        props: {
            query,
            ...(await serverSideTranslations(locale as string, [
                'header',
                'dashboard',
                'common',
                'footer',
                'home',
                'helpers',
            ])),
        },
    };
};

const routes = {
    create_provider: '/providers/create',
};

const Index: NextPageWithLayout = ({ query }: any) => {
    switch (`/${query.slug}/${query.params}`) {
        case routes.create_provider:
            return <CreateProvider query={query} />;

        default:
            break;
    }

    return <div>{query.id}</div>;
};

Index.getLayout = function getLayout(page) {
    return (
        <Layout>
            {/* <Header title={page.props.query.slug as string} /> */}
            {page}
            {/* <Bottom_footer /> */}
        </Layout>
    );
};

export default Index;
