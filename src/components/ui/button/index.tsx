import React, { FC, MouseEventHandler } from 'react';

import s from './index.module.scss';

interface ButtonInt {
    children: React.ReactNode;
    className: string;
    type?: 'button' | 'submit' | 'reset';
    icon?: React.ReactNode;
    isSubmitting?: boolean;
    fun?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<ButtonInt> = ({
    type = 'button',
    children,
    className,
    icon,
    fun,
    isSubmitting,
}): JSX.Element => {
    return (
        <button
            disabled={isSubmitting}
            onClick={fun}
            className={`${s.button} ${s[className]}`}
            type={type}
        >
            {icon && <span className={s.img}>{icon}</span>}

            {children}
        </button>
    );
};
