import dynamic from 'next/dynamic';
import { linksData } from 'src/data/common';
import { Branches } from './branches';
import { EditForm } from './branches/form/EditForm';
import { Settings } from './Settings';

const DynamicRequisites = dynamic(() => import('./Requisites'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

export const router: any = {
    requisites: DynamicRequisites,
    branches: Branches,
    settings: Settings,
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
