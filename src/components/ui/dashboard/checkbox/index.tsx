import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { FieldHookConfig, useField } from 'formik';
import s from './index.module.scss';

type CheckboxProps = {
    label?: string;
    checked?: boolean;
} & FieldHookConfig<any>;

export const Checkbox: FC<CheckboxProps> = (props): JSX.Element => {
    const [field] = useField(props);
    const { t } = useTranslation();

    return (
        <div className={s.root} data-id="checkbox-root">
            <input {...field} id={field.name} type="checkbox" checked={props?.value} disabled={props.disabled} />
            <label htmlFor={field.name}>{props.label ? t(`dashboard:${props.label}`) : field.name}</label>
        </div>
    );
};
