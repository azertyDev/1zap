import { AdvForm } from './adv_form';
import { BranchForm } from './branch_form';

export const router: any = {
    branches: BranchForm,
    adverts: AdvForm,
};

export const PromoInnerPages = ({ subPage }: { subPage: string }) => {
    const RoutePage = router[subPage];

    return <RoutePage />;
};
