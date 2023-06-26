import { InfoLinks } from 'components/ui/dashboard/info_links';
import { OverviewBlock } from 'components/ui/dashboard/overview_block';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { providerApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { IProviderStat } from 'types';
import { useRouter } from 'next/router';
import { InfoBanner } from 'components/ui/dashboard/info_banner';

export const ProfileEditProvider = () => {
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

    const linksDataAdmin = [
        {
            id: 1,
            link: `/dashboard/providers/requisites?id=${data?.providerId}`,
            icon: 'account_balance',
            title: 'requisites',
            desc: 'req_and_doc',
        },
        {
            id: 2,
            link: `/dashboard/providers/branch?id=${data?.providerId}`,
            icon: 'place',
            title: 'branches',
            desc: 'change_and_add',
        },
        {
            id: 3,
            link: `/dashboard/providers/balance?id=${data?.providerId}&page=1`,
            icon: 'monetization_on',
            title: 'account_balance',
            desc: 'info_fillup',
        },
        {
            id: 4,
            link: `/dashboard/providers/price_lists?id=${data?.providerId}&page=1`,
            icon: 'inventory_2',
            title: 'products',
            desc: '',
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
