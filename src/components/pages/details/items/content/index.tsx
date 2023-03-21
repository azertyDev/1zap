import s from './index.module.scss';

import React, { FC } from 'react';

export const ContentDetailsCategories: FC<{ children: React.ReactNode; title: string }> = ({
    children,
    title,
}): JSX.Element => {
    return (
        <div className={s.content}>
            <h4 className={s.content_title}>{title}</h4>

            <div className={s.content_inner}>{children}</div>
        </div>
    );
};
