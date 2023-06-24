import { useStore } from 'src/store/useStore';
import { InfoLinks } from 'components/ui/dashboard/info_links';
import { OverviewBlock } from 'components/ui/dashboard/overview_block';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { providerApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { IProviderStat } from '../../../../../../../../types';
import { useRouter } from 'next/router';
import { InfoBanner } from 'components/ui/dashboard/info_banner';

export const ProfileEditProvider = () => {
    const { userData } = useStore();
    const {
        query: { id },
    } = useRouter();
    const { t } = useTranslation();

    const [data, setData] = useState<IProviderStat | null>(null);

    useEffect(() => {
        providerApi
            .getProviderStatisticByAdmin(id as string)
            .then((res) => setData(res))
            .catch(() => toast.error(t('helpers:error_getting')));
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

    const linksDataAdmin = [
        {
            id: 2,
            link: `/dashboard/providers/requisites?id=${data?.providerId}`,
            icon: 'account_balance',
            title: 'requisites',
            desc: 'req_and_doc',
        },
        {
            id: 1,
            link: '/cabinet/main/branches',
            icon: 'place',
            title: 'branches',
            desc: 'change_and_add',
        },
    ];

    return (
        <div>
            {data && <InfoBanner data={data} />}
            <OverviewBlock data={overviewData} />
            <hr />
            <InfoLinks data={linksDataAdmin} />
        </div>
    );
};
