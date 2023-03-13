import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';
import { useStore } from 'src/store/useStore';
import { shallow } from 'zustand/shallow';

import { FloatingInput } from 'src/components/ui/input/float_input';
import { Button } from 'components/ui/button';
import { InputWrapper } from 'components/ui/input/input_wrapper';
import { client_validation } from 'src/validation/client_validation';

import s from '../index.module.scss';

export const Login: FC<{ fun: (val: number) => () => void }> = ({ fun }): JSX.Element => {
    const { t } = useTranslation();

    const { error, login } = useStore((state) => state, shallow);

    const initialValues = {
        email: '',
        password: '',
    };

    const onSubmit = async (values: FormikValues, { setStatus }: FormikHelpers<typeof initialValues>) => {
        login(values.email, values.password);
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: client_validation.login,
    });

    return (
        <div className={s.login}>
            <FormikProvider value={formik}>
                <Form>
                    <InputWrapper>
                        <FloatingInput {...formik.getFieldProps('email')} iconname="email" />
                    </InputWrapper>
                    <FloatingInput {...formik.getFieldProps('password')} iconname="key" type={'password'} />
                    {error && <span className="error">{error}</span>}

                    <div className={s.remember_wr}>
                        <div className={s.remember}>
                            <input type={'checkbox'} className={s.remember_checkbox} />
                            <div className={s.remember_checkbox_img}>
                                <div></div>
                            </div>

                            <p>{t('common:rememberme')}</p>
                        </div>
                        <p className={s.fix_password} onClick={fun(2)}>
                            {t('common:tofixPassword')}
                        </p>
                    </div>

                    <Button
                        // isSubmitting={isSubmitting}
                        variant={'primary'}
                        type={'submit'}
                    >
                        {t('header:login')}
                    </Button>
                </Form>
            </FormikProvider>
        </div>
    );
};
