import React, { FC } from 'react';

import s from './index.module.scss';

export const IconsWrapper: FC<{
    style?: string;
    children: React.ReactNode;
    onClick?: () => void;
}> = ({ style, onClick, children }) => {
    return (
        <div className={`${style ?? s.icon_wr}`} onClick={onClick}>
            {children}
        </div>
    );
};
