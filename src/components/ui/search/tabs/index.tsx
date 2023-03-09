import React, { FC, HtmlHTMLAttributes } from 'react';

import { useTranslation } from 'next-i18next';

import s from './index.module.scss';

import { SearchTabsInt } from 'src/interfaces/SearchTabsInt';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const SearchTabs: FC<
    SearchTabsInt & HtmlHTMLAttributes<HTMLDivElement>
> = ({
    tabs,
    children,
    activeTab,
    handleTab,
    tabsRes,
    className = '',
}): JSX.Element => {
    const { t } = useTranslation();
    const { pathname } = useRouter();

    return (
        <div className={className}>
            <div className={s.tabs}>
                {tabs.map((item) => {
                    return (
                        <>
                            {item.hasOwnProperty('link') ? (
                                <Link
                                    className={`${s.tab}`}
                                    href={'/request_vim'}
                                >
                                    {t(item.text)}
                                </Link>
                            ) : (
                                <span
                                    onClick={handleTab(item.id)}
                                    className={`${s.tab} ${
                                        activeTab === item.id ? s.active : ''
                                    }`}
                                    key={item.id}
                                >
                                    {t(item.text)}
                                </span>
                            )}
                        </>
                    );
                })}
            </div>

            <div className={s.tabs_res}>
                {tabsRes.map((item) => {
                    return (
                        <>
                            {item.hasOwnProperty('link') ? (
                                <Link
                                    className={`${s.tab}`}
                                    href={'/request_vim'}
                                >
                                    {t(item.text)}
                                </Link>
                            ) : (
                                <span
                                    onClick={handleTab(item.id)}
                                    className={`${s.tab} ${
                                        activeTab === item.id ? s.active : ''
                                    }`}
                                    key={item.id}
                                >
                                    {t(item.text)}
                                </span>
                            )}
                        </>
                    );
                })}
            </div>
            <div>{children}</div>
        </div>
    );
};
