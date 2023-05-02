import React, { FC } from 'react';
import s from './index.module.scss';

export const CenterWrapper: FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    return (
        <div className={s.wr}>
            <h3 className={s.title}>{title}</h3>
            <div className={s.content}>{children}</div>
        </div>
    );
};
