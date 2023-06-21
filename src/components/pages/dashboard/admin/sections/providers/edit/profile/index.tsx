import { useStore } from 'src/store/useStore';

import { InfoLinks } from 'components/ui/dashboard/info_links';
import { OverviewBlock } from 'components/ui/dashboard/overview_block';
import { Avatar } from 'components/ui/avatar';
import s from './index.module.scss';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { providerApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { IProviderStat } from 'types';

export const ProfileEditProvider = () => {
    const { userData } = useStore();
    const { t } = useTranslation();

    const [data, setData] = useState<IProviderStat | null>(null);

    const overviewData = [
        {
            id: 1,
            heading: t('dashboard:balance'),
            body: 1,
            footer: t('dashboard:till', { till: '' }),
            icon: 'payments',
            link: '/cabinet/balance?page=1',
        },
        {
            id: 2,
            heading: t('dashboard:transitions'),
            body: 0,
            footer: `+ ${t('dashboard:today')}`,
            icon: 'ads_click',
            link: '/cabinet/statistics',
        },
        {
            id: 3,
            heading: t('dashboard:productss'),
            body: 0,
            footer: t('dashboard:refresh_day', { day: '' }),
            icon: 'inventory_2',
            link: '/cabinet/price-list?page=1',
        },
        {
            id: 4,
            heading: t('dashboard:requests'),
            body: 0,
            footer: `+ ${t('dashboard:today')}`,
            icon: 'inbox',
            link: '/cabinet/statistics',
        },
    ];

    const linksDataAdmin = [
        {
            id: 2,
            link: '/cabinet/main/requisites',
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
        <div className={s.wrapper}>
            {/*<div className={s.info}>*/}
            {/*    <Avatar src="/assets/images/avatar2.jpeg" size={114} alt="user-avatar" />*/}
            {/*    {data && (*/}
            {/*        <div className={s.info__block}>*/}
            {/*            <h3 className={s.info_username}>*/}
            {/*                {userData?.user.fullName}*/}
            {/*                <span>ID {userData?.user.id}</span>*/}
            {/*            </h3>*/}
            {/*            <h2 className={s.info_company}>{userData?.user.companyName}</h2>*/}
            {/*            <h3 className={s.info_phone}>{userData?.user.phone}</h3>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}

            <OverviewBlock data={overviewData} />

            <hr />

            <InfoLinks data={linksDataAdmin} />
        </div>
    );
};
