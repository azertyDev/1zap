import { FC, memo } from 'react';
import { ErrorMessage, Field, FieldHookConfig, useField } from 'formik';
import { Icon } from 'src/components/ui/icon';
import { useTranslation } from 'next-i18next';
import { PatternFormat } from 'react-number-format';
import s from './index.module.scss';

interface InputProps {
    iconname?: string;
    iconSize?: number;
    isPhone?: boolean;
}

const Input: FC<FieldHookConfig<any> & InputProps> = (props): JSX.Element => {
    const { iconname, iconSize = 18, isPhone } = props;
    const [field, meta] = useField(props);
    const { t } = useTranslation();

    return (
        <div className={s.container}>
            <div>
                <label
                    htmlFor={field.name}
                    className={`${(field.value || field.value === 0) && s.filled} ${
                        meta.error && meta.touched ? s.err : ''
                    }`}
                >
                    {t(`common:${field.name}`)}
                </label>

                {isPhone ? (
                    <Field {...props}>
                        {() => {
                            return <PatternFormat type="tel" format="+998 ## #######" autoComplete="on" {...field} />;
                        }}
                    </Field>
                ) : (
                    <Field {...field} {...props} className={meta.error && meta.touched ? s.err : ''} />
                )}

                {iconname && field.value.length === 0 && !meta.error ? (
                    <Icon size={iconSize} name={iconname} color={'#0D0A19'} />
                ) : null}

                {field.value && !meta.error ? (
                    <Icon size={iconSize} name={'check_circle'} color={'#C6303C'} />
                ) : meta.error && meta.touched ? (
                    <Icon size={iconSize} name={'cancel'} color={'#C6303C'} />
                ) : null}
            </div>
            {meta.touched || meta.error ? (
                <ErrorMessage
                    name={field.name}
                    render={(msg) => <span className={s.error}>{t(`helpers:${msg}`)}</span>}
                />
            ) : null}
        </div>
    );
};

export const FloatingInput = memo(Input);
