import { FC, memo } from 'react';
import { ErrorMessage, Field, FieldHookConfig, useField } from 'formik';
import { Icon } from 'src/components/ui/icon';
import { useTranslation } from 'next-i18next';
import s from './index.module.scss';

interface InputProps {
    iconName?: string;
    iconSize?: number;
}

const Input: FC<FieldHookConfig<any> & InputProps> = (props): JSX.Element => {
    const { iconName, iconSize = 18 } = props;
    const [field, meta] = useField(props);
    const { t } = useTranslation('');

    return (
        <div className={s.container}>
            <div>
                <label htmlFor={field.name} className={field.value && s.filled}>
                    {t(`common:${field.name}`)}
                </label>
                <Field {...field} {...props} />

                {iconName ? (
                    <Icon
                        color={
                            !field.value
                                ? '#000'
                                : (field.value || meta.touched || meta.error) &&
                                  '#C6303C'
                        }
                        size={iconSize}
                        name={
                            !field.value
                                ? iconName
                                : meta.touched && meta.error
                                ? 'cancel'
                                : 'check_circle'
                        }
                    />
                ) : null}
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
