import { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'next-i18next';
import Navbar from 'src/components/ui/dashboard/navbar';
import s from './index.module.scss';

export const Layout: FC<PropsWithChildren> = ({ children }): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={s.layout}>
            <Navbar t={t} />
            <div className={s.content}>{children}</div>
        </div>
    );
};
