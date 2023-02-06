import React, {
    DetailedHTMLProps,
    FC,
    HTMLAttributes,
    MouseEventHandler,
    PropsWithChildren,
} from 'react';

import s from './index.module.scss';

interface IconsWrapperProps extends PropsWithChildren {
    size: 'big' | 'medium' | 'small';
    fun?: MouseEventHandler<HTMLDivElement>;
}

export const IconsWrapper: FC<IconsWrapperProps> = (props) => {
    const { children, size, fun } = props;
    return (
        <div className={`${s.icon_wr} ${s[size]} `} onClick={fun}>
            {children}
        </div>
    );
};
