import React, { FC } from 'react';

import s from './index.module.scss';

export const InputWrapper: FC<{ children: React.ReactNode }> = ({
    children,
}): JSX.Element => {
    return <div className={s.i_wr}>{children}</div>;
};
