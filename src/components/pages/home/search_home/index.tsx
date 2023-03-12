import { FC } from 'react';

import { useTranslation } from 'next-i18next';

import { SearchDetails } from 'components/pages/home/search_home/search_details';
import { SearchCatalog } from 'components/pages/home/search_home/search_catalog';
import { SearchCategory } from 'components/pages/home/search_home/search_category';
import { SearchTabs } from 'components/ui/search/tabs';

import s from './index.module.scss';
import { useHandleActivetTabHome } from 'src/hooks/search_home/useHandleActivetTabHome';
import { tabsValue } from 'src/constants/tabsValue';

export const SearchHome: FC = (): JSX.Element => {
    const { activeTab, handleActivetab } = useHandleActivetTabHome();

    const { t } = useTranslation();

    return (
        <SearchTabs activeTab={activeTab} handleTab={handleActivetab} tabs={tabsValue.searchHomeTabs}>
            {activeTab === 1 && <SearchDetails className={s.form_wr} />}
            {activeTab === 3 && <SearchCatalog />}
            {activeTab === 4 && <SearchCategory className={s.form_wr} />}
        </SearchTabs>
    );
};
