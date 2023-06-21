import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'next-i18next';
import { useStore } from 'src/store/useStore';
import Header from 'src/components/ui/dashboard/header';
import DashboardNav from 'src/components/ui/dashboard/navbar/dashboardNav';
import ProviderNav from 'src/components/ui/dashboard/navbar/providerNav';
import Bottom_footer from 'src/components/widgets/footer/bottom_footer';
import s from './index.module.scss';

export const Layout: FC<PropsWithChildren> = ({ children }): JSX.Element => {
    const { t } = useTranslation();
    const { userData } = useStore();

    const {
        query: { slug },
    } = useRouter();

    const navbar = userData?.user.role === 'admin' ? <DashboardNav t={t} /> : <ProviderNav t={t} />;

    return (
        <div className={s.layout}>
            {navbar}
            <div className={s.content}>
                <Header title={slug as string} id={userData?.user.id as number} />
                <main>{children}</main>
                <Bottom_footer className={s.footer} />
            </div>
        </div>
    );
};
