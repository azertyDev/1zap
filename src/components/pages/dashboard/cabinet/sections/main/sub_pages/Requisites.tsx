import * as Yup from 'yup';
import { Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';
import { Heading } from 'src/components/ui/dashboard/heading';
import { StandartInput } from 'src/components/ui/input/standart_input';
import { Button } from 'src/components/ui/button';
import s from '../index.module.scss';

export const Requisites = (props: any) => {
    const { pageProps } = props;

    const initialValues = {
        inn: '',
        oked: '',
        phone: '',
        fullName: '',
        bank_name: '',
        companyName: '',
        legalAddress: '',
        check_accaunt: '',
    };

    const validationSchema = Yup.object().shape({
        phone: Yup.string().required('required'),
        inn: Yup.string().max(12, 'Too Long!').required('required'),
        oked: Yup.string().max(12, 'Too Long!').required('required'),
        bank_name: Yup.string().max(12, 'Too Long!').required('required'),
        check_accaunt: Yup.string().max(12, 'Too Long!').required('required'),
        companyName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('required'),
        fullName: Yup.string().min(2, 'more_then_two_words').max(50, 'Too Long!').required('required'),
        legalAddress: Yup.string().min(2, 'more_then_two_words').max(50, 'Too Long!').required('required'),
    });

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<typeof initialValues>) => {
        // const { phone, providerBranch, ...rest } = values;
        console.log(values);
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
                            <StandartInput label="dashboard:legalAddress" {...formik.getFieldProps('legalAddress')} />
                            <StandartInput label="dashboard:companyName" {...formik.getFieldProps('companyName')} />
                        </div>

                        <div className={s.row}>
                            <StandartInput label="dashboard:fullName" iconname='' {...formik.getFieldProps('fullName')} />
                            <StandartInput
                                isPhone
                                label="dashboard:phone"
                                {...formik.getFieldProps('phone')}
                                setFieldValue={formik.setFieldValue}
                            />
                        </div>

                        <div className={s.row}>
                            <StandartInput label="dashboard:inn" {...formik.getFieldProps('inn')} />
                            <StandartInput label="common:okd" {...formik.getFieldProps('oked')} />
                        </div>

                        <div className={s.row}>
                            <StandartInput label="common:bankName" {...formik.getFieldProps('bank_name')} />
                            <StandartInput label="common:check" {...formik.getFieldProps('check_accaunt')} />
                        </div>
                    </div>

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
                </Form>
            </FormikProvider>
        </>
    );
};
