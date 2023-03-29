import { FC, ReactNode } from 'react';
import s from './index.module.scss';

interface StatisticsBlockProps {
    title: ReactNode;
    data: {
        id: number;
        title: string;
        date: string;
        count: number | string;
    }[];
}

export const StatisticsBlock: FC<StatisticsBlockProps> = ({ title, data }) => {
    return (
        <div className={s.root}>
            {title && <div className={s.block_title}>{title}</div>}
            <div className={s.counter_wrapper}>
                {data.map(({ id, count, date, title }) => {
                    return (
                        <div className={s.counter} key={id}>
                            <div>
                                <p>{title}</p>
                                <span>{date}</span>
                            </div>
                            <div>
                                <p>{count}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
