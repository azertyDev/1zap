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

const Requisites = (props: any) => {
    const { pageProps } = props;
    const { t } = useTranslation();
    const { userData } = useStore();
    const { push } = useRouter();

    const [data, setData] = useState<{
        fullName: string;
        legalAddress: string;
        phone: string;
        email: string;
        inn: string;
    } | null>(null);

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
    };

    const validationSchema = Yup.object().shape({
        phone: Yup.string().required('required'),
    });

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<typeof initialValues>) => {
        await providerApi
            .updateProviderPhone(userData?.user?.id!, { phone: values.phone.replaceAll(' ', '') })
            .then(() => push('/cabinet/main'))
            .catch(() => toast.error(t('helpers:error_sending')));
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
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
                            <StandartInput disabled label="dashboard:email" {...formik.getFieldProps('email')} />
                        </div>

                        <div className={s.row}>
                            <StandartInput
                                isPhone
                                label="dashboard:phone"
                                iconname=""
                                {...formik.getFieldProps('phone')}
                            />
                        </div>

                        <div className={s.actionButtons}>
                            <Button variant="disabled" type="reset" onClick={() => push('/cabinet/main')}>
                                {t('common:cancel')}
                            </Button>
                            <Button
                                type="submit"
                                disabled={!(formik.dirty || formik.isValid || formik.isSubmitting)}
                                variant={!(formik.dirty || formik.isValid) ? 'disabled' : 'primary'}
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
