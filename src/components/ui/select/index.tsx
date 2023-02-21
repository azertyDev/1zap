import React, { FC } from 'react';
import { FieldProps, useField } from 'formik';
import Select, { Props as SelectProps } from 'react-select';
import s from './index.module.scss';

interface SelectField extends SelectProps {
    label?: string;
}

export const SelectField: FC<SelectField & FieldProps> = ({
    label = 'Select',
    ...props
}) => {
    const [field, form, { setValue }] = useField(props.field.name);

    const onChange = ({ value }: any) => {
        setValue(value);
    };

    return (
        <div className={s.root}>
            <label htmlFor={field.name}>{label}</label>
            <Select
                {...props}
                onChange={onChange}
                id={field.name}
                required
                classNamePrefix={s.root}
                styles={{
                    container: (base) => ({
                        ...base,
                    }),
                    placeholder: (base) => ({
                        ...base,
                        display: 'none',
                    }),
                    control: (base) => ({
                        ...base,
                        border: 'none',
                    }),
                    indicatorSeparator: (base) => ({
                        display: 'none',
                    }),
                }}
            />
        </div>
    );
};
