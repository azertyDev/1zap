import React, { FC, useState } from 'react';

import s from '../index.module.scss';
import { FormikProvider, useFormik, Form } from 'formik';
import { FloatingInput } from 'src/components/ui/input/float_input';
import { Button } from 'components/ui/button';
import { useTranslation } from 'next-i18next';
import { Completed } from 'components/ui/completed';

import Image from 'next/image';
import { LoginEnd } from 'components/ui/login_modal/login_end';
import { client_validation } from 'src/validation/client_validation';

export const ForgotPassword: FC = (): JSX.Element => {
    const { t } = useTranslation();

    const [done, setDone] = useState(false);
    const [emailVal, setEmailVal] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: client_validation.loginForgot,
        onSubmit: async (values) => {
            setDone(true);
            setEmailVal(values.email);
        },
    });

    return (
        <div className={s.forgot_wr}>
            {!done && (
                <>
                    <Completed
                        smallTitle
                        title={'forgotPassword'}
                        img={<Image src={'/assets/icons/lock.svg'} alt={'lock'} width={34} height={39} />}
                    >
                        <p>{t('common:enteryourdata')}</p>
                    </Completed>
                    <div className={s.forgot_form}>
                        <FormikProvider value={formik}>
                            <Form>
                                <FloatingInput {...formik.getFieldProps('email')} />
                                <Button fullWidth variant={'primary'} type={'submit'}>
                                    {t('header:login')}
                                </Button>
                            </Form>
                        </FormikProvider>
                    </div>
                </>
            )}

            {done && <LoginEnd emailVal={emailVal} />}
        </div>
    );
};
