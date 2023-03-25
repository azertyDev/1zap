import React, { FC, HTMLAttributes } from 'react';
import s from './index.module.scss';

export interface ButtonPropsType extends HTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant: 'primary' | 'disabled';
    isSubmitting?: boolean;
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean;
}

export const Button: FC<ButtonPropsType> = (props) => {
    const { className, children, variant, type = 'button', fullWidth, ...rest } = props;

    return (
        <button
            {...rest}
            type={type}
            className={`${s.btn} ${className ?? ''} ${s[variant]} ${fullWidth && s.fullWidth}`}
        >
            {children}
        </button>
    );
};
