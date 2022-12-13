import { Home } from 'src/components/pages/home';
import type { NextPageWithLayout } from './_app';
import { Layout } from 'components/layout/client';
import { Container } from 'components/ui/container';

const HomePage: NextPageWithLayout = () => {
    return <Home />;
};

HomePage.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Container>{page}</Container>
        </Layout>
    );
};
export default HomePage;
