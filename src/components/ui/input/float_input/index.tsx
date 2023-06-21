import { FC, memo, useCallback, useState } from 'react';
import { ErrorMessage, Field, FieldHookConfig, useField } from 'formik';
import { Icon } from 'src/components/ui/icon';
import { useTranslation } from 'next-i18next';
import { PatternFormat } from 'react-number-format';
import s from './index.module.scss';

interface InputProps {
    iconname?: string;
    iconSize?: number;
    isPhone?: boolean;
    isPassword?: boolean;
}

const Input: FC<FieldHookConfig<any> & InputProps> = (props): JSX.Element => {
    const { iconname, iconSize = 18, isPhone, isPassword } = props;
    const [field, meta] = useField(props);
    const { t } = useTranslation();

    const [passwordType, setPasswordType] = useState(true);

    const handlePasswordType = useCallback(() => {
        setPasswordType((prev) => !prev);
    }, []);

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

                {isPassword && (
                    <div className={s.password_input_wr}>
                        <Field
                            type={passwordType ? 'password' : 'text'}
                            {...field}
                            {...props}
                            className={` ${meta.error && meta.touched ? s.err : ''}`}
                        />
                        <div className={s.password_input_icon} onClick={handlePasswordType}>
                            {!passwordType ? (
                                <Icon name={'visibility'} size={20} />
                            ) : (
                                <Icon name={'visibility_off'} size={20} />
                            )}
                        </div>
                    </div>
                )}
                {isPhone && (
                    <Field {...props}>
                        {() => {
                            return <PatternFormat type="tel" format="+998 ## #######" autoComplete="on" {...field} />;
                        }}
                    </Field>
                )}

                {!isPassword && !isPhone && (
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
