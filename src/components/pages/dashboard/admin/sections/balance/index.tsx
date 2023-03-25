import { OverviewBlock } from 'src/components/ui/dashboard/overview_block';
import { StatisticsBlock } from 'src/components/ui/dashboard/statistics_block';
import { balanceCardsData, balanceStatistics } from 'src/data/common';
import s from './index.module.scss';

export const Balance = () => {
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
