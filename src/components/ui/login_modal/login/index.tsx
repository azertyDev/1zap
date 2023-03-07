import React, { Dispatch, FC, SetStateAction } from 'react';

import s from '../index.module.scss';

import { useTranslation } from 'next-i18next';
import { Formik } from 'formik';
import { FloatingInput } from 'src/components/ui/input/float_input';
import { Button } from 'components/ui/button';
import { InputWrapper } from 'components/ui/input/input_wrapper';

import { useStore } from 'src/store/useStore';
import { useRouter } from 'next/router';
import { client_validation } from 'src/validation/client_validation';

export const Login: FC<{ fun: (val: number) => () => void }> = ({
    fun,
}): JSX.Element => {
    const { t } = useTranslation();
    const { push } = useRouter();
    const { login, data, error } = useStore();
    console.log(typeof error);
    const onSubmit = () => {};

    return (
        <div className={s.login}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={client_validation.login}
                onSubmit={(values, { setSubmitting }) => {
                    login(values.email, values.password);

                    if (error) {
                        console.log('error:', error);
                    }

                    if (data?.user?.role === 'admin') {
                        push('/dashboard/main');
                    }
                }}
            >
                {({ handleSubmit, values, ...rest }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <InputWrapper>
                                <FloatingInput
                                    name={'email'}
                                    iconname="email"
                                />
                            </InputWrapper>

                            <FloatingInput
                                name={'password'}
                                iconname="key"
                                type={'password'}
                            />
                            <div className={s.remember_wr}>
                                <div className={s.remember}>
                                    <input
                                        type={'checkbox'}
                                        className={s.remember_checkbox}
                                    />
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
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
};
