import { OverviewBlock } from 'src/components/ui/dashboard/overview_block';
import { StatisticsBlock } from 'src/components/ui/dashboard/statistics_block';
import { balanceStatistics } from 'src/data/common';
import s from './index.module.scss';

export const Balance = () => {
    const balanceCardsData = [
        {
            id: 1,
            heading: '160.000 сум',
            body: '100 Монет',
            footer: '1400 сум за просмотр',
            icon: 'payments',
            link: '/cabinet/statistics',
        },
        {
            id: 2,
            heading: '350.000 сум',
            body: '250 Монет',
            footer: '1400 сум за просмотр',
            icon: 'payments',
            link: '/cabinet/statistics',
        },
        {
            id: 3,
            heading: '350.000 сум',
            body: '250 Монет',
            footer: '1400 сум за просмотр',
            icon: 'payments',
            link: '/cabinet/statistics',
        },
        {
            id: 4,
            heading: '350.000 сум',
            body: '250 Монет',
            footer: '1400 сум за просмотр',
            icon: 'payments',
            link: '/cabinet/statistics',
        },
    ];

    return (
        <div className={s.wrapper}>
            <div>
                <StatisticsBlock data={balanceStatistics} title={<h4>Текущий баланс</h4>} />
            </div>
            <div className={s.overview}>
                <OverviewBlock data={balanceCardsData} title={<h4>Пополнение баланса</h4>} />
            </div>

            {/* <div>
                <p className={s.block_title}> История пополнений и списаний</p>
            </div> */}
        </div>
    );
};
