import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from 'src/components/ui/dashboard/navbar';
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
