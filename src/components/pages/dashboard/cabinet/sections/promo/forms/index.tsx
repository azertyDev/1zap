import { ListsForm } from './Lists';
import { BranchForm } from './Branches';
import { ChosenForm } from 'components/pages/dashboard/cabinet/sections/promo/forms/Chosen';
import { EditForm } from 'components/pages/dashboard/cabinet/sections/promo/forms/Edit';

export const router: any = {
    all_branches: BranchForm,
    all_lists: ListsForm,
    chosen: ChosenForm,
    edit: EditForm,
};

export const PromoInnerPages = ({ subPage }: { subPage: string }) => {
    const RoutePage = router[subPage];

    return <RoutePage />;
};
