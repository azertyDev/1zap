import s from './index.module.scss';

import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';

export const DetailCategoriesWr: FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => {
    const { t } = useTranslation('common');
    return (
        <div>
            <p className={s.sub_title}>{t('sparePartsCat')}</p>
            <h1 className={s.title}>{title}</h1>

            <div className={s.inner}>{children}</div>
        </div>
    );
};
