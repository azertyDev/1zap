import { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'next-i18next';
import { useStore } from 'src/store/useStore';
import DashboardNav from 'src/components/ui/dashboard/navbar/dashboardNav';
import ProviderNav from 'src/components/ui/dashboard/navbar/providerNav';
import s from './index.module.scss';

export const Layout: FC<PropsWithChildren> = ({ children }): JSX.Element => {
    const { t } = useTranslation();
    const { userData } = useStore();

    const navbar = userData?.user.role === 'admin' ? <DashboardNav t={t} /> : <ProviderNav t={t} />;

    return (
        <div className={s.layout}>
            {navbar}
            <div className={s.content}>{children}</div>
        </div>
    );
};
