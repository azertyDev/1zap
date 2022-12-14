import React, { FC } from 'react';
import { Header } from 'components/widgets/header';

import s from './index.module.scss';
import { Footer } from 'components/widgets/footer';

export const Layout: FC<{ children: React.ReactNode }> = ({
    children,
}): JSX.Element => {
    return (
        <div className={s.layout}>
            <Header />
            {children}
            <Footer />
        </div>
    );
};
