import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useStore } from 'src/store/useStore';
import Header from 'src/components/ui/dashboard/header';
import DashboardNav from 'src/components/ui/dashboard/navbar/dashboardNav';
import ProviderNav from 'src/components/ui/dashboard/navbar/providerNav';
import Bottom_footer from 'src/components/widgets/footer/bottom_footer';
import s from './index.module.scss';
import { IProviderStat } from '../../../../types';
import { providerApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';

export const Layout: FC<PropsWithChildren> = ({ children }): JSX.Element => {
    const { t } = useTranslation();
    const { userData } = useStore();

    const {
        query: { slug },
    } = useRouter();

    const navbar = userData?.user.role === 'admin' ? <DashboardNav t={t} /> : <ProviderNav t={t} />;
    const [data, setData] = useState<IProviderStat | null>(null);

    useEffect(() => {
        if (userData?.user.role !== 'admin') {
            (() => {
                providerApi
                    .getProviderStatistic()
                    .then((res) => setData(res))
                    .catch(() => toast.error(t('helpers:error_getting')));
            })();
        }
    }, []);

    return (
        <div className={s.layout}>
            {navbar}
            <div className={s.content}>
                <Header
                    title={slug as string}
                    id={data ? (data?.providerId as number) : (userData?.user?.id as number)}
                    logo={data?.image && data?.image.length > 0 ? data.image : '/assets/icons/person.svg'}
                />
                <main>{children}</main>
                <Bottom_footer className={s.footer} />
            </div>
        </div>
    );
};
