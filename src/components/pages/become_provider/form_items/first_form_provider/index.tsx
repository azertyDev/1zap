import React, { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { useTranslation } from 'next-i18next';

import s from '../../index.module.scss';

import { FloatingInput } from 'components/ui/float_input';
import { Formik } from 'formik';

import Select, { SingleValue } from 'react-select';

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
                        <FloatingInput name={'username'} />
                        <FloatingInput name={'surname'} />
                        <FloatingInput name={'lastname'} />
                        <FloatingInput name={'contactNumber'} />

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
                        <button
                            type="submit"
                            // disabled={isSubmitting}
                            className={s.btn}
                        >
                            {t('common:next')}
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};
