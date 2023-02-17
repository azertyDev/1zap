import { FC, useCallback, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { SearchDetails } from 'components/pages/home/search_home/search_details';
import { SearchCatalog } from 'components/pages/home/search_home/search_catalog';
import { SearchCategory } from 'components/pages/home/search_home/search_category';
import { SearchTabs } from 'components/ui/search/tabs';

import {
    searchHomeTabs,
    searchHomeTabsRes,
} from 'src/constants/searchHomeTabs';
import s from './index.module.scss';
import { useHandleActivetTabHome } from 'src/hooks/search_home/useHandleActivetTabHome';

export const SearchHome: FC = (): JSX.Element => {
    const { activeTab, handleActivetab } = useHandleActivetTabHome();

    const activeSearchFormPreview = useCallback((val: boolean) => {
        return `${s.form_wr} ${val ? s.active : ''}`;
    }, []);

    const { t } = useTranslation();

    return (
        <SearchTabs
            activeTab={activeTab}
            handleTab={handleActivetab}
            tabsRes={searchHomeTabsRes}
            tabs={searchHomeTabs}
        >
            {activeTab === 1 && (
                <SearchDetails className={activeSearchFormPreview} />
            )}
            {activeTab === 2 && (
                <SearchDetails className={activeSearchFormPreview} />
            )}
            {activeTab === 3 && <SearchCatalog />}
            {activeTab === 4 && (
                <SearchCategory className={activeSearchFormPreview} />
            )}
        </SearchTabs>
    );
};
