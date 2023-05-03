import { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from './_app';

import { Layout } from 'components/layout/client';
import { Container } from 'components/ui/container';
import { Home } from 'src/components/pages/home';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getLaximoData } from 'src/helpers/getLaximoData';
import { useCallback, useEffect, useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            data: await getLaximoData('ListCatalogs:Locale=en_US|ssd='),
            ...(await serverSideTranslations(locale as string, ['header', 'common', 'footer', 'home', 'helpers'])),
        },
    };
};

const HomePage: NextPageWithLayout<{ data: { dataRes: string } }> = ({ data }) => {
    const liveSearch = useCallback(() => {
        alert('searching....');
    }, []);

    const [val, setVal] = useState('');

    const handleInput = useCallback((ev: any) => {
        setVal(ev.target.value);
    }, []);

    useEffect(() => {
        if (val.length > 0) {
            const timer = setTimeout(liveSearch, 1000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [val]);

    return (
        <div>
            <input
                placeholder={'search'}
                onKeyUp={handleInput}
                style={{ border: '1px solid red', padding: '5px', margin: '20px' }}
            />
        </div>
    );
};

HomePage.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Container>{page}</Container>
        </Layout>
    );
};
export default HomePage;
