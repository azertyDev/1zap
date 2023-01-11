import { Field, FieldProps } from 'formik';
import { FC } from 'react';
import s from './index.module.scss';

export const FloatingInput: FC<{ name: string }> = ({
    name,
    ...rest
}): JSX.Element => {
    return (
        <Field name={name}>
            {({ field, form, meta }: FieldProps) => {
                return (
                    <div className={s.container}>
                        <input {...field} type="text" id={field.name} />
                        <label
                            htmlFor={field.name}
                            className={field.value && s.filled}
                        >
                            {field.name}
                        </label>
                        {meta.touched && meta.error && (
                            <div className={s.error}>{meta.error}</div>
                        )}
                    </div>
                );
            }}
        </Field>
    );
};
