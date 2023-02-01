import React, { FC } from 'react';

import s from './index.module.scss';

interface ButtonInt {
    children: React.ReactNode;
    className: string;
    type?: 'button' | 'submit' | 'reset';
    icon?: React.ReactNode;
}

export const Button: FC<ButtonInt> = ({
    type = 'button',
    children,
    className,
    icon,
}): JSX.Element => {
    return (
        <button className={`${s.button} ${className}`} type={type}>
            {icon && <span className={s.img}>{icon}</span>}

            {children}
        </button>
    );
};
