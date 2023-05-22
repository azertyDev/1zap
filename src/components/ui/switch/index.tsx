import { FC } from 'react';
import { FieldHookConfig, useField } from 'formik';
import s from './index.module.scss';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';

interface SwitchProps {}

export const Switch: FC<FieldHookConfig<any> & SwitchProps> = (props) => {
    const [field, meta] = useField(props);

    return (
        <label htmlFor={field.name} className={s.switch}>
            <input {...field} id={field.name} type="checkbox" role="switch" checked={field.value} />
        </label>
    );
};
