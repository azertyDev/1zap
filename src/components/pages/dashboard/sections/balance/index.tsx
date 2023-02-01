import { OverviewBlock } from 'src/components/ui/dashboard/overview_block';
import { StatisticsBlock } from 'src/components/ui/dashboard/statistics_block';
import { balanceCardsData, balanceStatistics } from 'src/data/common';
import s from './index.module.scss';

export const Balance = () => {
    return (
        <div className={s.wrapper}>
            <div>
                <p className={s.block_title}>Текущий баланс</p>
                <StatisticsBlock data={balanceStatistics} />
            </div>
            <div className={s.overview}>
                <p className={s.block_title}>Пополнение баланса</p>
                <OverviewBlock data={balanceCardsData} />
            </div>

            <div className={s.historyTable}>
                <p className={s.block_title}> История пополнений и списаний</p>
            </div>
        </div>
    );
};
