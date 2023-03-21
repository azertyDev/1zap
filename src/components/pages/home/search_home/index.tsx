import { FC } from 'react';

import { useTranslation } from 'next-i18next';

import { SearchDetails } from 'components/pages/home/search_home/search_details';

import { SearchTabs } from 'components/ui/search/tabs';

import s from './index.module.scss';
import { useHandleActivetTabHome } from 'src/hooks/search_home/useHandleActivetTabHome';
import { tabsValue } from 'src/constants/tabsValue';

export const SearchHome: FC = (): JSX.Element => {
    const { activeTab, handleActivetab } = useHandleActivetTabHome();
    const { t } = useTranslation();

    return (
        <SearchTabs activeTab={activeTab} handleTab={handleActivetab} tabs={tabsValue.searchHomeTabs}>
            <SearchDetails className={s.form_wr} />
        </SearchTabs>
    );
};
