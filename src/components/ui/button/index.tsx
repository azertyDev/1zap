import { FC, HTMLAttributes, forwardRef } from 'react';
import s from './index.module.scss';

export interface ButtonPropsType extends HTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant: 'primary' | 'disabled';
    isSubmitting?: boolean;
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean;
    ref?: React.Ref<HTMLButtonElement>;
    disabled?: boolean;
    disabledPointer?: boolean;
}

export const Button: FC<ButtonPropsType> = forwardRef((props, ref) => {
    const {
        className,
        children,
        variant,
        type = 'button',
        fullWidth,
        disabled = false,
        disabledPointer,
        ...rest
    } = props;

    return (
        <button
            ref={ref}
            type={type}
            {...rest}
            disabled={disabled}
            className={`${s.btn} ${className ?? ''} ${s[variant]} ${fullWidth && s.fullWidth} ${
                disabledPointer ? s.disable_pointer : ''
            }`}
        >
            {children}
        </button>
    );
});
