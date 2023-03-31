import React, { FC } from 'react';
import s from '../index.module.scss';
import Select from 'react-select';
import { useTranslation } from 'next-i18next';

export const FilterSelect: FC<{
    id: string;
    title: string;
    value: string;
    labelAlt: string;
    isTranslated?: boolean;
    fun: (val: string) => (ev: any) => void;
    options: { value: string; label: string }[];
}> = ({ id, title, value, labelAlt, options, fun, isTranslated }): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div className={s.select_wr}>
            <span className={s.select_title}>{title}</span>
            <Select
                instanceId={id}
                isSearchable={false}
                onChange={fun(id)}
                options={options}
                value={
                    {
                        value: value,
                        label: value ? (isTranslated ? value : t(`common:selects.${value}`)) : labelAlt,
                    } as any
                }
                classNamePrefix={'filter_search'}
            />
        </div>
    );
};
