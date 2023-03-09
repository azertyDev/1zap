import { FC, useState } from 'react';
import { Heading } from 'src/components/ui/dashboard/heading';
import { FirstForm } from './first_form';
import { SecondForm } from './second_form';
import { providerValues } from './first_form/initialValues';
import { IProviderForm } from './IProviderForm';

import s from './index.module.scss';

export const Providers: FC = (): JSX.Element => {
    const [tab, setTab] = useState(1);
    const [initialValues, setInitialValues] = useState<IProviderForm>({ ...providerValues });

    const handleTabChange = (value: number) => {
        setTab(value);
    };

    return (
        <div className={s.wrapper}>
            <Heading title="Настройки филиала" desc="Введите данные филиала и загрузите фото " />

            <div className={s.tabs}>
                <div className={s.tab}>
                    {tab === 1 ? (
                        <FirstForm
                            initialValues={initialValues}
                            setInitialValues={setInitialValues}
                            handleTabChange={handleTabChange}
                        />
                    ) : tab === 2 ? (
                        <SecondForm
                            initialValues={initialValues}
                            setInitialValues={setInitialValues}
                            handleTabChange={handleTabChange}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
};
