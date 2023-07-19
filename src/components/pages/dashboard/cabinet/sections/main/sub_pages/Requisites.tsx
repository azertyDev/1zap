import * as Yup from 'yup';
import { Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';
import { Heading } from 'src/components/ui/dashboard/heading';
import { StandartInput } from 'src/components/ui/input/standart_input';
import { Button } from 'src/components/ui/button';
import s from '../index.module.scss';
import { useStore } from 'src/store/useStore';
import { providerApi } from 'src/utils/api';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { checkPhone } from 'src/helpers/checkPhone';
import { client_validation } from 'src/validation/client_validation';

const Requisites = (props: any) => {
    const { pageProps } = props;
    const { t } = useTranslation();
    const { userData } = useStore();
    const { push } = useRouter();

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        providerApi
            .getProviderRequisites()
            .then((res) => setData(res))
            .catch(() => toast.error(t('helpers:error_getting')));
    }, []);

    const initialValues = {
        fullName: data?.fullName ?? '',
        legalAddress: data?.legalAddress ?? '',
        phone: data?.phone?.slice(4) ?? '',
        email: data?.email ?? '',
        inn: data?.inn ?? '',
        dealNumber: data?.dealNumber ?? '',
        companyName: data?.companyName ?? '',
    };

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<typeof initialValues>) => {
        await providerApi
            .updateProviderPhone(userData?.user?.id!, {
                phone: checkPhone(values.phone) as any,
                email: values.email,
                companyName: values.companyName,
            })
            .then(() => push('/cabinet/main'))
            .catch((err) => {
                if (err.response.data.error === 'user allready exist') {
                    toast.error(t('helpers:userAllreadyExist'));
                } else toast.error(t('helpers:error_sending'));
            });
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: client_validation.requisites_provider,
        enableReinitialize: true,
    });

    return (
        <>
            <Heading title={t(`dashboard:${pageProps.title}`)} desc={t(`dashboard:${pageProps.desc}`)} />

            <FormikProvider value={formik}>
                <Form>
                    <div className={s.formGroup}>
                        <div className={s.row}>
                            <StandartInput disabled label="dashboard:fullName" {...formik.getFieldProps('fullName')} />
                            <StandartInput
                                disabled
                                label="dashboard:legalAddress"
                                {...formik.getFieldProps('legalAddress')}
                            />
                        </div>

                        <div className={s.row}>
                            <StandartInput disabled label="common:inn" iconname="" {...formik.getFieldProps('inn')} />
                            <StandartInput label="dashboard:email" {...formik.getFieldProps('email')} />
                        </div>

                        <div className={s.row}>
                            <StandartInput
                                disabled
                                label="dashboard:dealNumber"
                                {...formik.getFieldProps('dealNumber')}
                            />
                            <StandartInput
                                isPhone
                                label="dashboard:phone"
                                iconname=""
                                {...formik.getFieldProps('phone')}
                            />
                        </div>
                        <div className={s.row}>
                            <StandartInput label="dashboard:companyName" {...formik.getFieldProps('companyName')} />
                        </div>

                        <div className={s.actionButtons}>
                            <Button variant="disabled" type="reset" onClick={() => push('/cabinet/main')}>
                                {t('common:cancel')}
                            </Button>
                            <Button
                                type="submit"
                                disabled={!(formik.dirty || formik.isValid || formik.isSubmitting)}
                                variant={!(formik.dirty || formik.isValid) ? 'disabled' : 'primary'}
                                disabledPointer={formik.isSubmitting}
                            >
                                {t('dashboard:refresh')}
                            </Button>
                        </div>
                    </div>
                </Form>
            </FormikProvider>
        </>
    );
};

export default Requisites;
