import { FC, memo } from 'react';
import { ErrorMessage, Field, FieldHookConfig, useField } from 'formik';
import s from './index.module.scss';
import { IconsWrapper } from '../icons_wrapper';
import { Icon } from '../icon';
import { useTranslation } from 'next-i18next';

const Input: FC<FieldHookConfig<any>> = (props): JSX.Element => {
    const [field, meta] = useField(props);
    const { t } = useTranslation('');
    return (
        <div className={s.container}>
            <div>
                <label htmlFor={field.name} className={field.value && s.filled}>
                    {t(`common:${field.name}`)}
                </label>
                <Field {...field} {...props} />

                <Icon name="edit" size={22} />
            </div>

            {meta.touched || meta.error ? (
                <ErrorMessage
                    component="span"
                    name={field.name}
                    className={s.error}
                />
            ) : null}
        </div>
    );
};

export const FloatingInput = memo(Input);
