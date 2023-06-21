import { useStore } from 'src/store/useStore';
import { linksData } from 'src/data/common';
import { InfoLinks } from 'src/components/ui/dashboard/info_links';
import { OverviewBlock } from 'src/components/ui/dashboard/overview_block';
import { Avatar } from 'src/components/ui/avatar';
import s from './index.module.scss';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { providerApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { IProviderStat } from 'types';

export const Main = () => {
    const { userData } = useStore();
    const { t } = useTranslation();

    const [data, setData] = useState<IProviderStat | null>(null);
    useEffect(() => {
        (() => {
            providerApi
                .getProviderStatistic()
                .then((res) => setData(res))
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, []);

    const overviewData = [
        {
            id: 1,
            heading: t('dashboard:balance'),
            body: data?.balance?.balance ?? 0,
            footer: t('dashboard:till', { till: data?.balance?.date ?? '' }),
            icon: 'payments',
            link: '/cabinet/balance?page=1',
        },
        {
            id: 2,
            heading: t('dashboard:transitions'),
            body: data?.transitions?.total ?? 0,
            footer: `+${data?.transitions?.info ?? ''} ${t('dashboard:today')}`,
            icon: 'ads_click',
            link: '/cabinet/statistics',
        },
        {
            id: 3,
            heading: t('dashboard:productss'),
            body: data?.products?.total ?? 0,
            footer: t('dashboard:refresh_day', { day: data?.products?.date ?? '' }),
            icon: 'inventory_2',
            link: '/cabinet/price-list?page=1',
        },
        {
            id: 4,
            heading: t('dashboard:requests'),
            body: data?.requests?.total ?? 0,
            footer: `+${data?.requests?.info ?? ''} ${t('dashboard:today')}`,
            icon: 'inbox',
            link: '/cabinet/statistics',
        },
    ];

    return (
        <div className={s.wrapper}>
            <div className={s.info}>
                <Avatar src="/assets/images/avatar2.jpeg" size={114} alt="user-avatar" />
                {data && (
                    <div className={s.info__block}>
                        <h3 className={s.info_username}>
                            {userData?.user.fullName}
                            <span>ID {userData?.user.id}</span>
                        </h3>
                        <h2 className={s.info_company}>{userData?.user.companyName}</h2>
                        <h3 className={s.info_phone}>{data?.phone}</h3>
                    </div>
                )}
            </div>

            {data && <OverviewBlock data={overviewData} />}

            <hr />

            <InfoLinks data={linksData} />
        </div>
    );
};
