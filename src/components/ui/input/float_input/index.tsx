import { FC, memo } from 'react';
import { ErrorMessage, Field, FieldHookConfig, useField } from 'formik';
import { Icon } from 'src/components/ui/icon';
import { useTranslation } from 'next-i18next';
import s from './index.module.scss';
import { PatternFormat } from 'react-number-format';

interface InputProps {
    iconName?: string;
    iconSize?: number;
    isPhone?: boolean;
}

const Input: FC<FieldHookConfig<any> & InputProps> = (props): JSX.Element => {
    const { iconName, iconSize = 18, isPhone } = props;
    const [field, meta] = useField(props);
    const { t } = useTranslation('');

    return (
        <div className={s.container}>
            <div>
                <label htmlFor={field.name} className={field.value && s.filled}>
                    {t(`common:${field.name}`)}
                </label>

                {isPhone ? (
                    <Field {...props}>
                        {() => {
                            return (
                                <PatternFormat
                                    type="tel"
                                    format="+998 ## #######"
                                    autoComplete="on"
                                    {...field}
                                />
                            );
                        }}
                    </Field>
                ) : (
                    <Field {...field} {...props} />
                )}

                {iconName && field.value.length === 0 && !meta.error ? (
                    <Icon size={iconSize} name={iconName} color={'#0D0A19'} />
                ) : null}

                {field.value && !meta.error ? (
                    <Icon
                        size={iconSize}
                        name={'check_circle'}
                        color={'#C6303C'}
                    />
                ) : meta.error ? (
                    <Icon size={iconSize} name={'cancel'} color={'#C6303C'} />
                ) : null}
            </div>
        </div>
    );
};

export const FloatingInput = memo(Input);
