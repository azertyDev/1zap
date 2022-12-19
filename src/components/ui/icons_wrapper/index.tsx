import React, { FC } from 'react';

import s from './index.module.scss';

export const IconsWrapper: FC<{ style: string; children: React.ReactNode }> = ({
    style,
    children,
}) => {
    return <div className={`${s.icon_wr} ${style}`}>{children}</div>;
};
