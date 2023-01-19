import React, { FC } from 'react';

import { useTranslation } from 'next-i18next';

import s from './index.module.scss';

import { SearchTabsInt } from 'src/interfaces/SearchTabsInt';

export const SearchTabs: FC<SearchTabsInt> = ({
    tabs,
    children,
    activeTab,
    handleTab,
    tabsRes,
}): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={s.search}>
            <div className={s.tabs}>
                {tabs.map((item) => {
                    return (
                        <span
                            onClick={handleTab(item.id)}
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

            <div className={s.tabs_res}>
                {tabsRes.map((item) => {
                    return (
                        <span
                            onClick={handleTab(item.id)}
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
            <div>{children}</div>
        </div>
    );
};
