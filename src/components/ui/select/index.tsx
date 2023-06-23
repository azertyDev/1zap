import { FC, useCallback } from 'react';
import { FieldProps, useField } from 'formik';
import { useTranslation } from 'next-i18next';
import Select, { Props as SelectProps, components } from 'react-select';

import s from './index.module.scss';

interface SelectField extends SelectProps {
    label?: string;
}

export const SelectField: FC<SelectField & FieldProps> = ({ label = 'Select', ...props }) => {
    const { t } = useTranslation();
    const [field, form, { setValue }] = useField(props.field.name);

    const onChange = ({ value }: any) => {
        setValue(value);
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
            {field.value && (
                <label htmlFor={field.name} className={s.label}>
                    {t(label)}
                </label>
            )}
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
                    placeholder={field.value ? null : t(label)}
                    value={props.options!.filter((option: any) => {
                        return option.value === field.value;
                    })}
                    styles={{
                        container: (base) => ({
                            ...base,
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
                    }}
                />
            </div>
        </div>
    );
};
