import { Form, FormikProvider, useFormik } from 'formik';
import { Heading } from 'src/components/ui/dashboard/heading';
import { StandartInput } from 'src/components/ui/input/standart_input';

export const Requisites = (props: any) => {
    const { pageProps } = props;

    // const formik = useFormik({
    //     initialValues,
    //     onSubmit,
    //     validationSchema,
    // });

    return (
        <>
            <Heading title={pageProps.title} desc={pageProps.desc} />

            {/* <FormikProvider value={formik}>
                <Form>
                    <h4>Реквизиты</h4>
                    <div className={s.formGroup}>
                        <div className={s.row}>
                            <div className={s.block}>
                                <StandartInput
                                    label="dashboard:legalAddress"
                                    {...formik.getFieldProps('legalAddress')}
                                />
                                <StandartInput label="dashboard:fullName" {...formik.getFieldProps('fullName')} />
                                <StandartInput label="dashboard:inn" {...formik.getFieldProps('inn')} />
                            </div>
                            <div className={s.block}>
                                <StandartInput label="dashboard:companyName" {...formik.getFieldProps('companyName')} />
                                <StandartInput
                                    isPhone
                                    label="dashboard:phone"
                                    {...formik.getFieldProps('phone')}
                                    setFieldValue={formik.setFieldValue}
                                />
                                <StandartInput label="dashboard:email" {...formik.getFieldProps('email')} />
                            </div>
                        </div>
                    </div>

                    <div className={s.actionButtons}>
                        <Button variant="disabled" type="reset" onClick={() => handleTabChange(1)}>
                            Назад
                        </Button>
                        <Button
                            type="submit"
                            disabled={!(formik.dirty || formik.isValid || formik.isSubmitting)}
                            variant={!(formik.dirty || formik.isValid) ? 'disabled' : 'primary'}
                        >
                            Готово
                        </Button>
                    </div>
                </Form>
            </FormikProvider> */}
        </>
    );
};
