import React, { FC } from 'react';

import s from './index.module.scss';
import { useTranslation } from 'next-i18next';
import { Icon } from 'components/ui/icon';
import Link from 'next/link';

export const BlockQuestion: FC<{ id: number; title: string; text: string }> = ({ id, title, text }) => {
    const { t } = useTranslation('center');
    return (
        <div className={s.block}>
            <Link href={'/'} className={s.link}></Link>
            <h6 className={s.title}>{title}</h6>
            <p className={s.text}>{text}</p>

            <div className={s.read}>
                <Icon name={'chevron_right'} size={18} color={'#C6303C'} />
                <span className={s.read_text}>{t('read')}</span>
            </div>
        </div>
    );
};
