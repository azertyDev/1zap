import React, {FC, HTMLAttributes} from 'react';
import s from './index.module.scss';

export interface ButtonPropsType extends HTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant: 'primary' | 'disabled';
    isSubmitting?: boolean;
    type?: "button" | "submit"
}

export const Button: FC<ButtonPropsType> = (props) => {
    const {className, children, variant, type = "button", ...rest} = props;

    return (
        <button className={`${s.btn} ${className ?? ''} ${s[variant]}`} type={type} {...rest}>
            {children}
        </button>
    );
};


