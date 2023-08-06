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
                        label: (value ? (isTranslated ? value : t(`common:selects.${value}`)) : labelAlt).toUpperCase(),
                    } as any
                }
                styles={{
                    container: (base) => ({
                        ...base,
                        padding: 0,
                    }),
                    valueContainer: (base) => ({
                        ...base,
                        padding: 0,
                    }),
                    placeholder: (base, state) => ({
                        ...base,
                        color: '#9A9EA7',
                        fontWeight: '600',
                        margin: 0,
                        fontSize: '14px',
                    }),
                    control: (base, state) => ({
                        ...base,
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        padding: '0',
                        boxShadow: 'none',
                    }),
                    option: (base, state) => ({
                        ...base,
                        fontSize: '12px',
                        cursor: 'pointer',
                        padding: '10px 5px',
                        background: state.isSelected ? '#C6303C' : state.isFocused ? 'transparent' : 'transparent',
                        color: state.isSelected ? '#fff' : '#0D0A19',
                        ':hover': {
                            background: 'rgba(198, 48, 60, 0.49)',
                        },
                    }),
                    singleValue: (base, state) => ({
                        ...base,
                        border: 'none',
                        fontWeight: '600',
                        fontSize: '14px',
                        color: state.isDisabled ? '#9A9EA7' : '#0D0A19',
                    }),
                    dropdownIndicator: (base, state) => ({
                        ...base,
                        color: state.isDisabled ? '#9A9EA7' : '#0D0A19',
                        svg: {
                            width: '18px',
                            height: '18px',
                            fill: state.isDisabled ? '#9A9EA7' : '#0D0A19',
                        },
                    }),
                    indicatorSeparator: (base) => ({
                        display: 'none',
                    }),
                    menuList: (base) => ({
                        ...base,
                        '::-webkit-scrollbar': {
                            width: '4px',
                        },
                        '::-webkit-scrollbar-track': {
                            background: '#F5F6F7',
                        },
                        '::-webkit-scrollbar-thumb': {
                            background: '#C6303C',
                        },
                    }),
                }}
            />
        </div>
    );
};
