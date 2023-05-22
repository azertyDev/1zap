import { linksData } from 'src/data/common';
import { Balance } from './Balance';
import { Branches } from './Branches';
import { Products } from './Products';
import { Promo } from './Promo';
import { Requisites } from './Requisites';
import { Settings } from './Settings';

export const router: any = {
    requisites: Requisites,
    branches: Branches,
    settings: Settings,
    balance: Balance,
    products: Products,
    promo: Promo,
    branch: () => <h1>Branch</h1>,
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
