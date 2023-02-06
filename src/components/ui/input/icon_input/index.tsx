import { FC, memo } from 'react';
import { ErrorMessage, Field, FieldHookConfig, useField } from 'formik';
import { Icon } from 'src/components/ui/icon';
import { useTranslation } from 'next-i18next';
import s from './index.module.scss';

const Input: FC<{ icon: string } & FieldHookConfig<string>> = ({
    icon,
    ...props
}): JSX.Element => {
    const [field, meta] = useField(props);
    const { t } = useTranslation('');

    return (
        <div className={s.container}>
            <div>
                <label htmlFor={field.name} className={field.value && s.filled}>
                    {t(`common:${field.name}`)}
                </label>
                <div>
                    <Field {...field} {...props} />
                    <Icon name={icon} size={18} />
                </div>
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

export const IconInput = memo(Input);
