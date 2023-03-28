import { FC, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { Logo } from 'components/ui/logo';
import { Button } from 'components/ui/button';
import { InputWrapper } from 'components/ui/input/input_wrapper';
import { FloatingInput } from 'components/ui/input/float_input';
import { SelectField } from 'components/ui/select';
import { Completed } from 'components/ui/completed';
import { Icon } from 'components/ui/icon';
import { formikValues } from 'src/constants/formik_values';
import { client_validation } from 'src/validation/client_validation';
import { useGetSelectValues } from 'src/hooks/common/useGetSelectValues';
import { toast } from 'react-hot-toast';
import { applicationApi } from 'src/utils/api';
import s from './index.module.scss';

export const BecomeProviderComp: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const [cancleBtn, setCancelBtn] = useState(true);
    const [done, setDone] = useState(false);

    const selectValues = useGetSelectValues();

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

            // Поставить проверку на ошибку с бэка
            // Сделать кнопку disabled (disabled={formik.error})
            // Убрать со стора метод addApplication()
            await applicationApi
                .addApplication(val)
                .then((response) => {
                    console.log(response);
                    setCancelBtn(false);
                    setDone(true);
                })
                .catch(({ response }) => {
                    toast.error(`${response.data.error}`);
                    console.log(response);
                });
        },
    });

    return (
        <div className={s.wrapper}>
            <header className={s.header}>
                <Link href={'/'}>
                    <Logo />
                </Link>
                {cancleBtn && (
                    <Link href={'/'}>
                        <Button variant={'disabled'}>{t('common:cancel')}</Button>
                    </Link>
                )}
            </header>

            {!done && (
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
                                    options={[
                                        {
                                            value: 'tireFitting',
                                            label: t('select:tireFitting'),
                                        },
                                        {
                                            value: 'autoService',
                                            label: t('select:autoService'),
                                        },
                                        {
                                            value: 'partSelection',
                                            label: t('select:partSelection'),
                                        },
                                    ]}
                                />

                                <Field
                                    component={SelectField}
                                    name="city"
                                    label={t('common:city')}
                                    options={[
                                        {
                                            value: 'tashkent',
                                            label: t('select:tashkent'),
                                        },
                                        {
                                            value: 'bukhara',
                                            label: t('select:bukhara'),
                                        },
                                        {
                                            value: 'samarkand',
                                            label: t('select:samarkand'),
                                        },
                                        {
                                            value: 'andijan',
                                            label: t('select:andijan'),
                                        },
                                        {
                                            value: 'namangan',
                                            label: t('select:namangan'),
                                        },
                                    ]}
                                />
                            </div>
                            <Button variant={'primary'} type={'submit'}>
                                {t('common:next')}
                            </Button>
                        </Form>
                    </FormikProvider>
                </div>
            )}

            {done && (
                <div className={s.second_form_wr}>
                    <Completed title={'requestSend'} img={<Icon size={28} name={'done'} />}>
                        <p>{t('common:weWillConnect')}</p>
                    </Completed>
                    <Link href={'/'}>
                        <Button variant={'primary'}>{t('common:returnHone')}</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};
