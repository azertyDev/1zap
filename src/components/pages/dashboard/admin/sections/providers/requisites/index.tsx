import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { providerApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';
import { Heading } from 'components/ui/dashboard/heading';
import s from '../index.module.scss';
import { StandartInput } from 'components/ui/input/standart_input';
import { Button } from 'components/ui/button';
import { client_validation } from 'src/validation/client_validation';
import { checkPhone } from 'src/helpers/checkPhone';

export const RequisitesEditProvider = () => {
    const { t } = useTranslation();
    const {
        push,
        query: { id },
    } = useRouter();

    const [data, setData] = useState<{
        fullName: string;
        legalAddress: string;
        phone: string;
        email: string;
        inn: string;
    } | null>(null);

    useEffect(() => {
        providerApi
            .fetchProviderById(id as string)
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

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<typeof initialValues>) => {
        providerApi
            .editProviderRequisites(id as string, { ...values, phone: checkPhone(values.phone) })
            .then(() => push(`/dashboard/providers/profile?id=${id}`))
            .catch(() => toast.error(t('helpers:error_sending')));
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: client_validation.requisites_provider,
        enableReinitialize: true,
    });

    return (
        <>
            <Heading title={t(`dashboard:req_and_doc`)} desc={''} />

            <FormikProvider value={formik}>
                <Form>
                    <div className={s.formGroup}>
                        <div className={s.row}>
                            <StandartInput label="dashboard:fullName" {...formik.getFieldProps('fullName')} />
                            <StandartInput label="dashboard:legalAddress" {...formik.getFieldProps('legalAddress')} />
                        </div>

                        <div className={s.row}>
                            <StandartInput label="common:inn" iconname="" {...formik.getFieldProps('inn')} />
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
                            <Button
                                variant="disabled"
                                type="reset"
                                onClick={() => push(`/dashboard/providers/profile?id=${id}`)}
                            >
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
