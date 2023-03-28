import { FC } from 'react';

import { useTranslation } from 'next-i18next';
import { Field, Form, FormikProvider, useFormik } from 'formik';

import { Button } from 'components/ui/button';
import { InputWrapper } from 'components/ui/input/input_wrapper';
import { FloatingInput } from 'components/ui/input/float_input';
import { SelectField } from 'components/ui/select';

import { formikValues } from 'src/constants/formik_values';
import { client_validation } from 'src/validation/client_validation';
import { toast } from 'react-hot-toast';
import { applicationApi } from 'src/utils/api';
import s from './index.module.scss';
import { BecomeProviderHeader } from 'components/pages/become_provider/header';
import { useRouter } from 'next/router';

export const BecomeProviderComp: FC<{ staticPar: IStaticParams }> = ({ staticPar }): JSX.Element => {
    const { t } = useTranslation();
    const { push } = useRouter();

    const formik = useFormik({
        initialValues: formikValues.becomeProvider,
        validationSchema: client_validation.becomeProvider,
        onSubmit: async (values) => {
            const val = {
                phone: values.phone.slice(1).replaceAll(' ', ''),
                service: values.service,
                city: values.city,
                providerName: values.username,
                providerSurname: values.surname,
                companyName: values.companyName,
            };

            await applicationApi
                .addApplication(val)
                .then((response) => {
                    push('/become_provider/final_step');
                })
                .catch(({ response }) => {
                    toast.error(t('helpers:error_sending'));
                });
        },
    });

    console.log(staticPar);
    return (
        <div className={s.wrapper}>
            <BecomeProviderHeader />

            <div>
                <h2 className={s.title}>{t('footer:becomeSupplier')}</h2>
                <FormikProvider value={formik}>
                    <Form className={s.form}>
                        <InputWrapper>
                            <FloatingInput {...formik.getFieldProps('username')} />
                        </InputWrapper>
                        <InputWrapper>
                            <FloatingInput {...formik.getFieldProps('surname')} />
                        </InputWrapper>
                        <InputWrapper>
                            <FloatingInput {...formik.getFieldProps('companyName')} />
                        </InputWrapper>
                        <InputWrapper>
                            <FloatingInput {...formik.getFieldProps('phone')} isPhone />
                        </InputWrapper>

                        <div className={s.select_wr}>
                            <Field
                                component={SelectField}
                                name="service"
                                label={t('common:autoService')}
                                options={staticPar ? staticPar.service : [{ value: '', label: '' }]}
                            />

                            <Field
                                component={SelectField}
                                name="city"
                                label={t('common:city')}
                                options={staticPar ? staticPar.city : [{ value: '', label: '' }]}
                            />
                        </div>
                        <Button
                            disabled={!formik.dirty || !formik.isValid}
                            variant={!formik.dirty || !formik.isValid ? 'disabled' : 'primary'}
                            fullWidth
                            type={'submit'}
                        >
                            {t('common:next')}
                        </Button>
                    </Form>
                </FormikProvider>
            </div>
        </div>
    );
};
