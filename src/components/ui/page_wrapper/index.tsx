import React, { FC, PropsWithChildren } from 'react';

import s from './index.module.scss';
import { Container } from 'components/ui/container';

export const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={s.wr}>
            {/*<Container></Container>*/}

            {children}
        </div>
    );
};
