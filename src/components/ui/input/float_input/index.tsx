import { FC, memo } from 'react';
import { ErrorMessage, Field, FieldHookConfig, useField } from 'formik';
import { Icon } from 'src/components/ui/icon';
import { useTranslation } from 'next-i18next';
import s from './index.module.scss';

interface InputProps {
    iconName?: string;
    iconSize?: number;
    iconColor: string;
}

const Input: FC<FieldHookConfig<any> & InputProps> = (props): JSX.Element => {
    const { iconName, iconSize = 18, iconColor } = props;
    const [field, meta] = useField(props);
    const { t } = useTranslation('');

    return (
        <div className={s.container}>
            <div>
                <label htmlFor={field.name} className={field.value && s.filled}>
                    {t(`common:${field.name}`)}
                </label>
                <Field {...field} {...props} />
                <div
                    style={{
                        color: 'red',
                        fill: 'red',
                    }}
                >
                    {iconName ? (
                        <Icon
                            name={
                                meta.touched && meta.error ? 'cancel' : iconName
                            }
                            size={meta.touched && meta.error ? 18 : iconSize}
                            color={
                                meta.touched && meta.error ? 'red' : iconColor
                            }
                        />
                    ) : null}
                </div>
            </div>

            {/*{meta.touched || meta.error ? (*/}
            {/*    <ErrorMessage*/}
            {/*        component="span"*/}
            {/*        name={field.name}*/}
            {/*        className={s.error}*/}
            {/*    />*/}
            {/*) : null}*/}
        </div>
    );
};

export const FloatingInput = memo(Input);
