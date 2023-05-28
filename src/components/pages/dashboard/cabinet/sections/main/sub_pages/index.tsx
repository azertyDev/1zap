import dynamic from 'next/dynamic';
import { linksData } from 'src/data/common';
import { Balance } from './Balance';
import { Branches } from './branches';
import { EditForm } from './branches/form/EditForm';
import { Products } from './Products';
import { Promo } from './Promo';
import { Settings } from './Settings';

const DynamicRequisites = dynamic(() => import('./Requisites'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

export const router: any = {
    requisites: DynamicRequisites,
    branches: Branches,
    settings: Settings,
    balance: Balance,
    products: Products,
    promo: Promo,
    editBranch: EditForm,
};

export const MainInnerPages = ({ subPage }: { subPage: string }) => {
    const RoutePage = router[subPage];
    const findedPage = linksData.find((link) => link.title === subPage);

    return (
        <>
            <RoutePage pageProps={findedPage} />
        </>
    );
};
