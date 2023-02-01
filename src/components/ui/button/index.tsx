import React, { FC } from 'react';

import s from './index.module.scss';

interface ButtonInt {
    children: React.ReactNode;
    className: string;
    type?: 'button' | 'submit' | 'reset';
    icon?: React.ReactNode;
    isSubmitting?: boolean;
}

export const Button: FC<ButtonInt> = ({
    type = 'button',
    children,
    className,
    icon,

    isSubmitting,
}): JSX.Element => {
    return (
        <button
            disabled={isSubmitting}
            className={`${s.button} ${s[className]}`}
            type={type}
        >
            {icon && <span className={s.img}>{icon}</span>}

            {children}
        </button>
    );
};
