import { linksData } from 'src/data/common';
import { InfoLinks } from 'src/components/ui/dashboard/info_links';
import { OverviewBlock } from 'src/components/ui/dashboard/overview_block';

import s from './index.module.scss';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { providerApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { IProviderStat } from 'types';
import { InfoBanner } from 'components/ui/dashboard/info_banner';

export const Main = () => {
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
        },
        {
            id: 2,
            heading: t('dashboard:transitions'),
            body: data?.transitions?.total ?? 0,
            footer: `+${data?.transitions?.info ?? ''} ${t('dashboard:today')}`,
            icon: 'ads_click',
        },
        {
            id: 3,
            heading: t('dashboard:productss'),
            body: data?.products?.total ?? 0,
            footer: t('dashboard:refresh_day', { day: data?.products?.date ?? '' }),
            icon: 'inventory_2',
        },
        {
            id: 4,
            heading: t('dashboard:requests'),
            body: data?.requests?.total ?? 0,
            footer: `+${data?.requests?.info ?? ''} ${t('dashboard:today')}`,
            icon: 'inbox',
        },
    ];

    return (
        <div className={s.wrapper}>
            {data && <InfoBanner data={data} />}

            {data && <OverviewBlock data={overviewData} />}

            <hr />

            <InfoLinks data={linksData} />
        </div>
    );
};
