import React, { FC, useState } from 'react';

import s from './index.module.scss';
import { Icon } from 'components/ui/icon';
import { useTranslation } from 'next-i18next';
import { Completed } from 'components/ui/completed';

import { Formik } from 'formik';
import { FloatingInput } from 'components/ui/input/float_input';
import { Button } from 'components/ui/button';

export const BookDetailStepTwo: FC<{ fun: (val: boolean) => () => void }> = ({
    fun,
}): JSX.Element => {
    const { t } = useTranslation();

    const [done, setDone] = useState(false);
    const [phoneVal, setPhoneVal] = useState('');

    return (
        <div className={s.inner}>
            <div className={s.header}>
                <p className={s.header_title}>{t('common:ordering')}</p>

                <div onClick={fun(false)}>
                    <Icon size={19} name={'close'} />
                </div>
            </div>
            <div className={s.book_wr}>
                <Completed
                    smallTitle
                    title={done ? 'thanks' : 'orderDetail'}
                    img={
                        <Icon
                            size={done ? 20 : 40}
                            name={done ? 'done' : 'email'}
                        />
                    }
                >
                    <p>
                        {done
                            ? t('common:phoneSms', { phone: phoneVal })
                            : t('common:smsSend')}
                    </p>
                </Completed>
                {!done && (
                    <div className={s.book_form}>
                        <Formik
                            initialValues={{
                                phoneNumber: '',
                                surname: '',
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setDone(true);
                                setPhoneVal(values.phoneNumber);
                                alert(JSON.stringify(values));
                            }}
                        >
                            {({ handleSubmit, isSubmitting }) => (
                                <form
                                    onSubmit={handleSubmit}
                                    className={s.form}
                                >
                                    <div className={s.inputs_wr}>
                                        <FloatingInput name={'surname'} />
                                        <FloatingInput name={'phoneNumber'} />
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
                )}
                {done && (
                    <Button fun={fun(false)} className={'main'}>
                        {t('common:continueSearch')}
                    </Button>
                )}
            </div>
        </div>
    );
};
