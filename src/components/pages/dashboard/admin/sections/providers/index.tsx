import { FC, useState } from 'react';
import { Heading } from 'src/components/ui/dashboard/heading';
import { Button } from 'src/components/ui/button';
import s from './index.module.scss';
import { FirstForm } from './first_form';
import { SecondForm } from './second_form';

export const Providers: FC = (): JSX.Element => {
    const [tab, setTab] = useState(1);

    const handleTabChange = (value: number) => {
        setTab(2);
    };

    return (
        <div className={s.wrapper}>
            <Heading title="Настройки филиала" desc="Введите данные филиала и загрузите фото " />

            <div className={s.tabs}>
                <div className={s.tab}>{tab === 1 ? <FirstForm /> : tab === 2 ? <SecondForm /> : null}</div>
            </div>
            <div className={s.actionButtons}>
                <Button variant={'disabled'} type="reset">
                    Отмена
                </Button>
                <Button variant={'primary'} type="submit" onClick={() => handleTabChange(2)}>
                    Далее
                </Button>
            </div>
        </div>
    );
};
