import { FC } from 'react';
import { Button } from 'src/components/ui/button';
import s from './index.module.scss';

interface StatisticsReportProps {
    data: {
        id: number;
        title: string;
        desc: string;
        coins: string;
    }[];
}

export const StatisticsReport: FC<StatisticsReportProps> = ({ data }) => {
    return (
        <div className={s.root}>
            {data.map(({ id, title, desc, coins }) => {
                return (
                    <div className={s.item} key={id}>
                        <div>
                            <p className={s.title}>{title}</p>
                            <span>{desc}</span>
                        </div>
                        <span>
                            {`${coins ? `${coins} монет` : 'Бесплатно'}`}
                        </span>
                        <Button variant={"primary"} className={s.btn}>Заказать</Button>
                    </div>
                );
            })}
        </div>
    );
};
