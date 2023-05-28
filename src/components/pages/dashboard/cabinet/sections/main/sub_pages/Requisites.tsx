import * as Yup from 'yup';
import { Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';
import { Heading } from 'src/components/ui/dashboard/heading';
import { StandartInput } from 'src/components/ui/input/standart_input';
import { Button } from 'src/components/ui/button';
import s from '../index.module.scss';
import { useStore } from 'src/store/useStore';
import { providerApi } from 'src/utils/api';

const Requisites = (props: any) => {
    const { pageProps } = props;
    const { userData } = useStore();

    const initialValues = {
        fullName: userData?.user?.fullName ?? '',
        legalAddress: userData?.user.companyName ?? '',
        phone: userData?.user?.phone ?? '',
        email: userData?.user?.email ?? '',
        inn: userData?.user?.fullName ?? '',
    };

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('required'),
        legalAddress: Yup.string().required('required'),
        phone: Yup.string().required('required'),
        email: Yup.string().required('required'),
        inn: Yup.string().required('required'),
    });

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<typeof initialValues>) => {
        console.log(values);

        await providerApi.updateProvider(userData?.user?.id!, values);
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        enableReinitialize: true,
    });

    return (
        <>
            <Heading title={pageProps.title} desc={pageProps.desc} />

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

                        {/* <div className={s.row}>
                            <StandartInput label="dashboard:inn" {...formik.getFieldProps('inn')} />
                            <StandartInput label="common:okd" {...formik.getFieldProps('oked')} />
                        </div> */}

                        {/* <div className={s.row}>
                            <StandartInput label="common:bankName" {...formik.getFieldProps('bank_name')} />
                            <StandartInput label="common:check" {...formik.getFieldProps('check_accaunt')} />
                        </div> */}
                        <div className={s.actionButtons}>
                            <Button variant="disabled" type="reset">
                                Отмена
                            </Button>
                            <Button
                                type="submit"
                                disabled={!(formik.dirty || formik.isValid || formik.isSubmitting)}
                                variant={!(formik.dirty || formik.isValid) ? 'disabled' : 'primary'}
                            >
                                Обновить
                            </Button>
                        </div>
                    </div>
                </Form>
            </FormikProvider>
        </>
    );
};

export default Requisites;
