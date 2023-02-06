import React, { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { useTranslation } from 'next-i18next';

import s from '../../index.module.scss';
import { Formik } from 'formik';

import { FloatingInput } from 'src/components/ui/input/float_input';
import Select, { SingleValue } from 'react-select';
import { Button } from 'components/ui/button';
import { InputWrapper } from 'components/ui/input_wrapper';

export const FirstFormProvider: FC<{
    fun: Dispatch<SetStateAction<boolean>>;
}> = ({ fun }): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div>
            <h2 className={s.title}>{t('footer:becomeSupplier')}</h2>
            <Formik
                initialValues={{
                    username: '',
                    surname: '',
                    lastname: '',
                    contactNumber: '',
                    autoService: '',
                    city: '',
                }}
                onSubmit={(values, { setSubmitting }) => {
                    fun(true);
                    // alert(JSON.stringify(values));
                }}
            >
                {({ handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit} className={s.form}>
                        <InputWrapper>
                            <FloatingInput name={'username'} />
                        </InputWrapper>
                        <InputWrapper>
                            <FloatingInput name={'surname'} />
                        </InputWrapper>
                        <InputWrapper>
                            <FloatingInput name={'lastname'} />
                        </InputWrapper>
                        <InputWrapper>
                            <FloatingInput name={'contactNumber'} />
                        </InputWrapper>

                        <div className={s.select_wr}>
                            <Select
                                instanceId={'autoService'}
                                isSearchable={false}
                                onChange={(
                                    e: SingleValue<{
                                        value: string;
                                        label: string;
                                    }>
                                ) => setFieldValue('autoService', e?.value)}
                                options={[
                                    { value: 'a', label: 'a' },
                                    { value: 'b', label: 'b' },
                                ]}
                                placeholder={t('common:autoService')}
                                classNamePrefix={'filter_provider'}
                            />
                            <Select
                                instanceId={'city'}
                                isSearchable={false}
                                onChange={(
                                    e: SingleValue<{
                                        value: string;
                                        label: string;
                                    }>
                                ) => setFieldValue('city', e?.value)}
                                options={[
                                    { value: 'a', label: 'a' },
                                    { value: 'b', label: 'b' },
                                ]}
                                placeholder={t('common:city')}
                                classNamePrefix={'filter_provider'}
                            />
                        </div>
                        <Button
                            // isSubmitting={isSubmitting}
                            className={'main'}
                            type={'submit'}
                        >
                            {t('common:next')}
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    );
};
