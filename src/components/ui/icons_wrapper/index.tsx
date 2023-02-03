import React, {
    DetailedHTMLProps,
    FC,
    HTMLAttributes,
    PropsWithChildren,
} from 'react';

import s from './index.module.scss';

interface IconsWrapperProps extends PropsWithChildren {
    size: 'big' | 'medium' | 'small';
}

export const IconsWrapper: FC<IconsWrapperProps> = (props) => {
    const { children, size } = props;
    return (
        <div className={`${s.icon_wr} ${s[size]} `} {...props}>
            {children}
        </div>
    );
};
