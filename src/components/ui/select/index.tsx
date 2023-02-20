import React, {FC} from "react";
import {Props as SelectProps} from "react-select/dist/declarations/src";
import {FieldProps, useField} from "formik";
import Select from "react-select";

export const SelectField: FC<SelectProps & FieldProps> = (props) => {
    const [field, state, {setValue, setTouched},] = useField(props.field.name);

    const onChange = ({value}: { value: string | number }) => {
        setValue(value);

    };

    return (
        <Select {...props} onChange={onChange}/>
    );
}