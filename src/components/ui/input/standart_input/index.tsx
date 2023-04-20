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
    label?: string;
    setFieldValue?: (field: string, value: any) => void;
}

const Input: FC<FieldHookConfig<any> & InputProps> = (props): JSX.Element => {
    const { iconname = 'edit', iconSize = 18, isPhone, setFieldValue, label = 'Input' } = props;
    const [field, meta, form] = useField(props);
    const { t } = useTranslation();

    return (
        <div className={s.container}>
            <div>
                <label htmlFor={field.name} className={field.value && s.filled}>
                    {t(label)}
                </label>

                {isPhone ? (
                    <Field {...props}>
                        {() => {
                            return <PatternFormat type="tel" format="+998 ## #######" autoComplete="on" {...field} />;
                        }}
                    </Field>
                ) : (
                    <Field {...field} {...props} />
                )}

                {iconname && field.value.length === 0 && !meta.error ? <Icon size={iconSize} name={iconname} /> : null}

                {field.value && !meta.error ? (
                    <Icon size={iconSize} name={'check_circle'} color={'#C6303C'} />
                ) : meta.error ? (
                    <Icon size={iconSize} name={'cancel'} color={'#C6303C'} />
                ) : null}
            </div>
            {meta.touched || meta.error ? (
                <ErrorMessage
                    component="span"
                    name={field.name}
                    className={s.error}
                    render={(msg) => <span className={s.error}>{t(`helpers:${msg}`)}</span>}
                />
            ) : null}
        </div>
    );
};

export const StandartInput = memo(Input);
