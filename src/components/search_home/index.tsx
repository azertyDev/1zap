import { FC, useCallback, useState } from 'react';

import s from './index.module.scss';

import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { SearchDetails } from 'components/search_home/search_details';
import { SearchCatalog } from 'components/search_home/search_catalog';
import { SearchCategory } from 'components/search_home/search_category';

const searchHomeTabs = [
    { id: 1, text: 'home:searchDetail' },
    { id: 2, text: 'common:searchVin' },
    { id: 3, text: 'common:sparePartsCat' },
    { id: 4, text: 'home:categoryProduct' },
];

export const SearchHome: FC = (): JSX.Element => {
    const [activeTab, setActiveTab] = useState(1);
    const handleActivetab = useCallback((val: number) => {
        return () => setActiveTab(val);
    }, []);

    const { t } = useTranslation();

    return (
        <div className={s.search}>
            <div className={s.tabs}>
                {searchHomeTabs.map((item) => {
                    return (
                        <span
                            onClick={handleActivetab(item.id)}
                            className={`${s.tab} ${
                                activeTab === item.id ? s.active : ''
                            }`}
                            key={item.id}
                        >
                            {t(item.text)}
                        </span>
                    );
                })}
            </div>
            {activeTab === 1 && <SearchDetails />}
            {activeTab === 2 && <SearchDetails />}
            {activeTab === 3 && <SearchCatalog />}
            {activeTab === 4 && <SearchCategory />}
        </div>
    );
};
