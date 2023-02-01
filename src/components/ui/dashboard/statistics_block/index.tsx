import { FC } from 'react';
import s from './index.module.scss';

interface StatisticsBlockProps {
    data: {
        id: number;
        title: string;
        date: string;
        count: string;
    }[];
}

export const StatisticsBlock: FC<StatisticsBlockProps> = ({ data }) => {
    return (
        <div className={s.root}>
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
    );
};
