import { FC, useCallback, useEffect, useState } from 'react';
import { FieldProps, useField } from 'formik';
import { useTranslation } from 'next-i18next';
import Select, { Props as SelectProps, components } from 'react-select';

import s from './index.module.scss';
import { useRouter } from 'next/router';
import { useStore } from 'zustand';

interface SelectField extends SelectProps {

}

export const SimpleSelectField: FC<SelectField & FieldProps> = ({ ...props }) => {
    const { t } = useTranslation();
    const [field, form, { setValue }] = useField(props.field.name);
    const { push, pathname, query,locale,locales,query:{city:Qcity} } = useRouter();
    const [city, setCity] = useState("all_cities");

   

    useEffect(() => {
        const city = localStorage.getItem('city');

        if(city){
            setCity(city)
        }
    }, [Qcity]);

    const onChange = ({ value }: any) => {
        push({
            pathname: pathname,
            query: { ...query,city:value},
        });

        setCity(value)
        localStorage.setItem('city', value);
        
    };

    const NoOptionsMessage = useCallback((props: any) => {
        return (
            <components.NoOptionsMessage {...props}>
                <span></span>
            </components.NoOptionsMessage>
        );
    }, []);

    return (
        <div className={`${s.root} ${props.field.value ? s.active : ''} ${props.isDisabled ? s.disabled : ''}`}>
            <div className={s.select_wr}>
            <Select
                    {...props}
                    onChange={onChange}
                    id={field.name}
                    instanceId={field.name}
                    isSearchable={field.name === 'codeimg'}
                    components={{ NoOptionsMessage }}
                    className="select_container"
                    classNamePrefix="select"
                    placeholder={Qcity?t(`common:selects.${Qcity}`) :t(`common:selects.all_cities`)}
                    value={props.options!.filter((option: any) => {
                        return option.value === field.value;
                    })}
                    styles={{
                        container: (base) => ({
                            ...base,
                            width :"110px"
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
                            backgroundColor: state.isDisabled ? 'inherit' : '',
                            boxShadow: state.isFocused ? 'none' : 'none',
                            padding: '0 5px',
                        }),
                        option: (base) => ({
                            ...base,
                            fontSize: '12px',
                            cursor: 'pointer',
                        }),
                        singleValue: (base, state) => ({
                            ...base,
                            border: 'none',
                            fontWeight: '600',
                            fontSize: '14px',
                            color: state.isDisabled ? '#9A9EA7' : '#0D0A19',
                        }),
                        dropdownIndicator: (base, state) => ({
                   
                            color: state.isDisabled ? '#9A9EA7' : '#0D0A19',
                            svg: {
                               display:"none"
                            },
                        }),
                        indicatorSeparator: (base) => ({
                            display: 'none',
                        }),
                    }}
                />
            </div>
        </div>
    );
};
