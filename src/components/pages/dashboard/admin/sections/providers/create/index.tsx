import { FC, useState } from 'react';
import { Heading } from 'src/components/ui/dashboard/heading';
import { FirstForm } from './first_form';
import { SecondForm } from './second_form';
import { providerValuesSecond } from './first_form/initialValues';
import { useTranslation } from 'next-i18next';
import s from './index.module.scss';

export const CreateProvider: FC<any> = () => {
    const [tab, setTab] = useState(1);
    const { t } = useTranslation();

    const handleTabChange = (value: number) => {
        setTab(value);
    };

    const [branches, setBranches] = useState(providerValuesSecond);

    return (
        <div className={s.wrapper}>
            <Heading title={t('dashboard:branch_settings')} desc={t('dashboard:add_branch_info')} />
            <div className={s.tabs}>
                <div className={s.tab}>
                    {tab === 1 ? (
                        <FirstForm branches={branches} setBranches={setBranches} handleTabChange={handleTabChange} />
                    ) : tab === 2 ? (
                        <SecondForm branches={branches} handleTabChange={handleTabChange} setBranches={setBranches} />
                    ) : null}
                </div>
            </div>
        </div>
    );
};
