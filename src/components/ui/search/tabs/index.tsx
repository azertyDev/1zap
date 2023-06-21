import React, { FC, HtmlHTMLAttributes } from 'react';

import { useTranslation } from 'next-i18next';

import s from './index.module.scss';

import { SearchTabsInt } from 'src/interfaces/SearchTabsInt';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const SearchTabs: FC<SearchTabsInt & HtmlHTMLAttributes<HTMLDivElement>> = ({
    tabs,
    children,
    activeTab,
    handleTab,
    className = '',
    responsiveDif,
}): JSX.Element => {
    const { t } = useTranslation();
    const { pathname } = useRouter();

    return (
        <div className={className}>
            <div className={`${s.tabs} ${responsiveDif ? s.res_dif : ''}`}>
                {tabs.map((item) => {
                    return (
                        <div key={item.id} className={`${s.tab} ${activeTab === item.id ? s.active : ''}`}>
                            {item.hasOwnProperty('link') ? (
                                <>
                                    <Link className={`${item.altText ? s.text : ''}`} href={item.link as string}>
                                        {t(item.text)}
                                    </Link>
                                    {item.altText && (
                                        <Link className={s.text_alt} href={item.link as string}>
                                            {t(item.altText)}
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <div onClick={handleTab(item.id)}>
                                    <span className={`${item.altText ? s.text : ''}`}>{t(item.text)}</span>
                                    {item.altText && <span className={s.text_alt}>{t(item.altText)}</span>}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div>{children}</div>
        </div>
    );
};
