import React, { FC } from 'react';

import s from './index.module.scss';

export const InputSelectWrTabs: FC<{ children: React.ReactNode }> = ({
    children,
}): JSX.Element => {
    return <div className={s.wr}>{children}</div>;
};
