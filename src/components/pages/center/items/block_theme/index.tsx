import { IconsWrapper } from 'components/ui/icons_wrapper';
import React, { FC } from 'react';
import { Icon } from 'components/ui/icon';

import s from './index.module.scss';
import Link from 'next/link';

export const BlockTheme: FC<{ children: React.ReactNode; title: string; icon: string; link: string }> = ({
    children,
    title,
    icon,
    link,
}) => {
    return (
        <div className={s.block}>
            <Link href={link} className={s.link}></Link>
            <div className={s.icon}>
                <IconsWrapper>
                    <Icon name={icon} color={'#9A9EA7'} size={18} />
                </IconsWrapper>
            </div>

            <h5 className={s.title}>{title}</h5>
            <ul className={s.list}>{children}</ul>
        </div>
    );
};
