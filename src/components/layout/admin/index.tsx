import { FC } from 'react';
import Navbar from './navbar';
import { useTranslation } from 'react-i18next';
import s from './index.module.scss';

export const Layout: FC<{ children: React.ReactNode }> = ({
    children,
}): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={s.layout}>
            <Navbar />
            <div className={s.content}>{children}</div>
        </div>
    );
};
