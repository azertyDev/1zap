import React, { Dispatch, FC, SetStateAction } from 'react';

import s from '../index.module.scss';

import { useTranslation } from 'next-i18next';
import { Formik } from 'formik';
import { FloatingInput } from 'components/ui/float_input';
import { Button } from 'components/ui/button';
import { InputWrapper } from 'components/ui/input_wrapper';

export const Login: FC<{ fun: (val: number) => () => void }> = ({
    fun,
}): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={s.login}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={(values, { setSubmitting }) => {
                    alert(JSON.stringify(values));
                }}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit} className={s.form}>
                        <InputWrapper>
                            <FloatingInput name={'email'} />
                        </InputWrapper>

                        <FloatingInput name={'password'} />
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
                            className={'main'}
                            type={'submit'}
                        >
                            {t('header:login')}
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    );
};
