import React, {FC, HtmlHTMLAttributes, MouseEventHandler, PropsWithChildren} from 'react';

import s from './index.module.scss';

interface ButtonInt extends PropsWithChildren {
    classN: string;
    icon?: React.ReactNode;
    isSubmitting?: boolean;
}


export const Button: FC<ButtonInt & HtmlHTMLAttributes<HTMLButtonElement>> = (props): JSX.Element => {
    const {children, icon, isSubmitting, classN} = props;
    return (
        <button
            disabled={isSubmitting}
            className={`${s.button} ${s[classN ?? '']}`}
            {...props}
        >
            {icon && <span className={s.img}>{icon}</span>}

            {children}
        </button>
    );
};
