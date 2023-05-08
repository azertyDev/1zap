import s from './index.module.scss';
import React, { FC } from 'react';

export const AboutTitle: FC<{ children: React.ReactNode }> = ({ children }) => {
    return <h2 className={s.title}>{children}</h2>;
};
