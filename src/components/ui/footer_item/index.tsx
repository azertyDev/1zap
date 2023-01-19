import { FC, useCallback, useState } from 'react';
import Link from 'next/link';

import s from './index.module.scss';

import { useTranslation } from 'next-i18next';

import { FooterItemInt } from 'src/interfaces/footerItem';
import { useHandleActiveLink } from 'src/hooks/footer/useHandleActiveLink';

export const FooterItem: FC<FooterItemInt> = ({
    title,
    links,
    children,
}): JSX.Element => {
    const { t } = useTranslation();
    const { active, handleAtiveFooterLink } = useHandleActiveLink();

    return (
        <div className={s.list}>
            <h4 className={s.list_title} onClick={handleAtiveFooterLink}>
                {t(title)}
            </h4>
            <div className={`${s.list_content} ${active ? s.active : ''}`}>
                {children ? children : null}
                {links.map((item) => {
                    return (
                        <Link href={item.link} key={item.id} className={s.link}>
                            {t(item.text)}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
