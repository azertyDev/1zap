import { useStore } from 'src/store/useStore';
import { linksData } from 'src/data/common';
import { InfoLinks } from 'src/components/ui/dashboard/info_links';
import { OverviewBlock } from 'src/components/ui/dashboard/overview_block';
import { Avatar } from 'src/components/ui/avatar';
import s from './index.module.scss';

export const Main = () => {
    const { userData } = useStore();

    const overviewData = [
        {
            id: 1,
            heading: 'Баланс',
            body: userData?.balance,
            footer: 'До 01.01.23',
            icon: 'payments',
            link: '/cabinet/balance',
        },
        {
            id: 2,
            heading: 'Переходов',
            body: '2,354',
            footer: '+123 Сегодня',
            icon: 'ads_click',
            link: '/cabinet/statistics',
        },
        {
            id: 3,
            heading: 'Товаров',
            body: '13,213',
            footer: 'Обновление 3 дня назад',
            icon: 'inventory_2',
            link: '/cabinet/price-list',
        },
        {
            id: 4,
            heading: 'Запросов',
            body: '503',
            footer: '+13 Сегодня',
            icon: 'inbox',
            link: '/cabinet/statistics',
        },
    ];

    return (
        <div className={s.wrapper}>
            <div className={s.info}>
                <Avatar src="/assets/images/avatar2.jpeg" size={114} alt="user-avatar" />
                <div className={s.info__block}>
                    <h3 className={s.info_username}>
                        {userData?.user.fullName}
                        <span>ID {userData?.user.id}</span>
                    </h3>
                    <h2 className={s.info_company}>{userData?.user.companyName}</h2>
                    <h3 className={s.info_phone}>{userData?.user.phone}</h3>
                </div>
            </div>

            <OverviewBlock data={overviewData} />

            <hr />

            <InfoLinks data={linksData} />
        </div>
    );
};
