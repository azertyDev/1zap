import { FC } from 'react';
import { FieldHookConfig, useField } from 'formik';
import s from './index.module.scss';

export const Checkbox: FC<FieldHookConfig<any>> = (props): JSX.Element => {
    const [field] = useField(props);

    return (
        <div className={s.root} data-id="checkbox-root">
            <input {...field} id={field.name} type="checkbox" />
            <label htmlFor={field.name}>{field.name}</label>
        </div>
    );
};
