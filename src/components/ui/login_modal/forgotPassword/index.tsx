import React, { FC, useState } from 'react';

import s from '../index.module.scss';
import { Formik } from 'formik';
import { InputWrapper } from 'components/ui/input_wrapper';
import { FloatingInput } from 'src/components/ui/input/float_input';
import { Button } from 'components/ui/button';
import { useTranslation } from 'next-i18next';
import { Completed } from 'components/ui/completed';
import { Icon } from 'components/ui/icon';
import Image from 'next/image';
import { LoginEnd } from 'components/ui/login_modal/login_end';

export const ForgotPassword: FC = (): JSX.Element => {
    const { t } = useTranslation();

    const [done, setDone] = useState(false);
    const [emailVal, setEmailVal] = useState('');

    return (
        <div className={s.forgot_wr}>
            {!done && (
                <>
                    <Completed
                        smallTitle
                        title={'forgotPassword'}
                        img={
                            <Image
                                src={'/assets/icons/lock.svg'}
                                alt={'lock'}
                                width={34}
                                height={39}
                            />
                        }
                    />

                    <div className={s.forgot_form}>
                        <Formik
                            initialValues={{
                                email: '',
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setDone(true);
                                setEmailVal(values.email);
                            }}
                        >
                            {({ handleSubmit, isSubmitting }) => (
                                <form
                                    onSubmit={handleSubmit}
                                    className={s.form}
                                >
                                    <FloatingInput name={'email'} />
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
                </>
            )}

            {done && <LoginEnd emailVal={emailVal} />}
        </div>
    );
};
