import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslation } from 'next-i18next';

import s from '../../index.module.scss';

import { FloatingInput } from 'src/components/ui/input/float_input';
import { Formik } from 'formik';

import { Completed } from 'components/ui/completed';
import { Icon } from 'components/ui/icon';
import { Button } from 'components/ui/button';
import { InputWrapper } from 'components/ui/input/input_wrapper';

import Link from 'next/link';
import {becomeProviderSec} from "src/validation/beacome_provider";

export const SecondFormProvider: FC<{
    fun: Dispatch<SetStateAction<boolean>>;
}> = ({ fun }): JSX.Element => {
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
                        validationSchema={becomeProviderSec}
                        onSubmit={(values, { setSubmitting }) => {
                            alert(JSON.stringify(values));
                            setIsDone(true);
                            fun(false);
                        }}
                    >
                        {({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} className={s.form}>
                                <InputWrapper>
                                    <FloatingInput name={'companyName'} />
                                </InputWrapper>
                                <InputWrapper>
                                    <FloatingInput name={'address'} />
                                </InputWrapper>
                                <InputWrapper>
                                    <FloatingInput name={'nameBoss'} />
                                </InputWrapper>

                                <div className={s.inputs_wr}>
                                    <FloatingInput name={'inn'} />
                                    <FloatingInput name={'okd'} />
                                    <FloatingInput name={'bankName'} />
                                    <FloatingInput name={'check'} />
                                </div>
                                <Button
                                    // isSubmitting={isSubmitting}
                                  variant={"primary"}
                                >
                                    {t('common:sendRequest')}
                                </Button>
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
                        <Button variant={"primary"}>
                            {t('common:returnHone')}
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};
