import { FC } from 'react';
import { FieldHookConfig, useField } from 'formik';
import s from './index.module.scss';

interface CheckboxProps {
    label?: string;
}

export const Checkbox: FC<FieldHookConfig<any> & CheckboxProps> = ({
    label = 'checkbox',
    ...props
}) => {
    const [field, meta] = useField(props);

    return (
        <>
            <div className={s.checkbox_group}>
                <input
                    {...field}
                    id={field.name}
                    type="checkbox"
                    role="checkbox"
                />
                <label htmlFor={field.name}>{label}</label>
            </div>
        </>
    );
};
