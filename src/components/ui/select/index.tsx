import React, {FC} from 'react';
import {FieldProps, useField} from 'formik';

import Select, {Props as SelectProps} from 'react-select';

import s from './index.module.scss';

interface SelectField extends SelectProps {
    label?: string;

}

export const SelectField: FC<SelectField & FieldProps> = ({
                                                              label = 'Select',
                                                              ...props
                                                          }) => {
    const [field, form, {setValue}] = useField(props.field.name);

    const onChange = ({value}: any) => {
        setValue(value);
    };
console.log(field);

    return (
        <div className={`${s.root} ${props.field.value ? s.active : ""}`}>
            {props.field.value && <label htmlFor={field.name} className={s.label}>{label}</label>}
            <div className={s.select_wr}>
                <Select
                    {...props}
                    onChange={onChange}
                    id={field.name}
                    isSearchable={false}
                    className="select_container"
                    classNamePrefix="select"
                    placeholder={label}
                    styles={{
                        container: (base) => ({
                            ...base,
                        }),
                        placeholder: (base) => ({
                            ...base,
                            color: "#9A9EA7",
                            fontWeight: "600",
                            fontSize: "14px"
                        }),

                        control: (base, state) => ({
                            ...base,
                            border: 'none',
                            boxShadow: state.isFocused ? "none" : "none",
                            padding: "0 5px"
                        }),
                        option: (base) => ({
                            ...base,
                            fontSize: "12px",
                            cursor: "pointer",

                        }),
                        singleValue: (base,) => ({
                            ...base,
                            border: 'none',
                            color: "#0D0A19",
                            fontWeight: "600",
                            fontSize: "14px",

                        }),
                        dropdownIndicator: (base) => ({
                            ...base,
                            svg: {
                                width: "16px",
                                height: "16px"
                            }
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
