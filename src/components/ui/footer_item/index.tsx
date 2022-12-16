import { FC } from 'react';
import Link from 'next/link';

import s from './index.module.scss';

import { useTranslation } from 'next-i18next';

import { FooterItemInt } from 'src/interfaces/footerItem';

export const FooterItem: FC<FooterItemInt> = ({
    title,
    links,
    children,
}): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={s.list}>
            {<h4 className={s.list_title}>{t(title)}</h4>}
            {children ? children : null}
            {links.map((item) => {
                return (
                    <Link href={item.link} key={item.id} className={s.link}>
                        {t(item.text)}
                    </Link>
                );
            })}
        </div>
    );
};
