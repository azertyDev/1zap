import React, {FC, HTMLAttributes, ReactNode} from 'react';
import s from './index.module.scss';

type ButtonVariants = 'primary' | 'disabled';

export interface ButtonPropsType extends HTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant: ButtonVariants;
    isSubmitting?: boolean;
}

export const Button: FC<ButtonPropsType> = (props) => {
    const {className, children, variant, ...rest} = props;

    return (
        <button className={`${s.btn} ${className ?? ''} ${s[variant]}`} {...rest}>
            {children}
        </button>
    );
};


