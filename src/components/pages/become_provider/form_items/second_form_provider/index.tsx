import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';

import s from '../../index.module.scss';

import { FloatingInput } from 'components/ui/float_input';
import { Formik } from 'formik';

import Select, { SingleValue } from 'react-select';
import { Completed } from 'components/ui/completed';
import { Icon } from 'components/ui/icon';
import { Button } from 'components/ui/button';
import Link from 'next/link';

export const SecondFormProvider: FC = (): JSX.Element => {
    const { t } = useTranslation();

    const [isDone, setIsDone] = useState(false);

    return (
        <div>
            {!isDone && (
                <div>
                    <h2 className={s.title}>{t('common:requisites')}</h2>
                    <Formik
                        initialValues={{
                            companyName: '',
                            address: '',
                            nameBoss: '',
                            inn: '',
                            okd: '',
                            bankName: '',
                            check: '',
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            alert(JSON.stringify(values));
                            setIsDone(true);
                        }}
                    >
                        {({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} className={s.form}>
                                <FloatingInput name={'companyName'} />
                                <FloatingInput name={'address'} />
                                <FloatingInput name={'nameBoss'} />
                                <div className={s.inputs_wr}>
                                    <FloatingInput name={'inn'} />
                                    <FloatingInput name={'okd'} />
                                    <FloatingInput name={'bankName'} />
                                    <FloatingInput name={'check'} />
                                </div>

                                <button
                                    type="submit"
                                    // disabled={isSubmitting}
                                    className={s.btn}
                                >
                                    {t('common:sendRequest')}
                                </button>
                            </form>
                        )}
                    </Formik>

                    <p className={s.warn_text}>{t('common:warnText')}</p>
                </div>
            )}

            {isDone && (
                <div className={s.second_form_wr}>
                    <Completed
                        title={'requestSend'}
                        img={<Icon size={28} name={'done'} />}
                    >
                        <p>{t('common:weWillConnect')}</p>
                    </Completed>
                    <Link href={'/'}>
                        <Button className={'main'}>
                            {t('common:returnHone')}
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};
