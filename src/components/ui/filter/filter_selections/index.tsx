import React, { FC, useState } from 'react';
import s from './index.module.scss';

export const FilterSelections: FC<{ children: React.ReactNode }> = ({
    children,
}): JSX.Element => {
    return <div className={s.filter}>{children}</div>;
};
