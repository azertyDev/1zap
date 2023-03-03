import { FC } from 'react';
import * as Yup from 'yup';
import { Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';
import { Button } from 'src/components/ui/button';
import { StandartInput } from 'src/components/ui/input/standart_input';
import s from '../index.module.scss';

export const SecondForm: FC = () => {
    const initialValues = {
        legalAddress: '',
        phone: '',
        fullName: '',
        email: '',
        password: '',
        inn: '',
        coin: 0,
    };

    const validationSchema = Yup.object().shape({
        legalAddress: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        phone: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        inn: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        coin: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    });

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<typeof initialValues>) => {
        alert(JSON.stringify(values, null, 2));
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return (
        <FormikProvider value={formik}>
            <Form>
                <div>
                    <StandartInput {...formik.getFieldProps('legalAddress')} iconname="edit" />
                    <StandartInput {...formik.getFieldProps('phone')} iconname="edit" />
                    <StandartInput {...formik.getFieldProps('email')} iconname="edit" />
                </div>

                <div className={s.actionButtons}>
                    <Button variant={'primary'} type="submit">
                        Submit
                    </Button>
                    <Button variant={'disabled'} type="reset">
                        Reset
                    </Button>
                </div>
            </Form>
        </FormikProvider>
    );
};
