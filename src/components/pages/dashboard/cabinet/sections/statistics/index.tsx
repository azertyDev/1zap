import { FC } from 'react';
import { StatisticsBlock } from 'src/components/ui/dashboard/statistics_block';
import { StatisticsReport } from 'src/components/ui/dashboard/statistics_report';
import { reports, statisticsData } from 'src/data/common';
import s from './index.module.scss';

interface StatisticsProps {}

export const Statistics: FC<StatisticsProps> = (props) => {
    return (
        <div className={s.root} data-id="statistics-root">
            <StatisticsBlock data={statisticsData} title={<h4>Текущие показатели</h4>} />

            <div
                style={{
                    marginBottom: 40,
                }}
            >
                <p className={s.block_title}>Платные отчеты</p>

                <StatisticsReport data={reports.paid} />
            </div>

            <div>
                <p className={s.block_title}>Бесплатные отчеты</p>

                <StatisticsReport data={reports.free} />
            </div>
        </div>
    );
};
