import { FC, HtmlHTMLAttributes, PropsWithChildren } from 'react';

import s from './index.module.scss';

interface IconsWrapperProps extends PropsWithChildren {
    size?: 'big' | 'medium' | 'small';
    variant?: 'rounded' | 'square';
}

export const IconsWrapper: FC<
    IconsWrapperProps & HtmlHTMLAttributes<HTMLDivElement>
> = (props) => {
    const { children, size = 'medium', variant = 'square' } = props;

    return (
        <div className={`${s.icon_wr} ${s[size]} ${s[variant]}`} {...props}>
            {children}
        </div>
    );
};
