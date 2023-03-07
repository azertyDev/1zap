import { FC } from 'react';
import * as Yup from 'yup';
import { Form, FormikHelpers, FormikValues, FormikProvider, useFormik } from 'formik';
import { Heading } from 'src/components/ui/dashboard/heading';
import { InfoLinks } from 'src/components/ui/dashboard/info_links';
import { FloatingInput } from 'src/components/ui/input/float_input';
import { Button } from 'src/components/ui/button';
import s from './index.module.scss';
import { Checkbox } from 'src/components/ui/checkbox';

export const linksData = [
    {
        id: 2,
        link: '#',
        icon: 'account_balance',
        title: 'Реквизиты',
        desc: 'Обновление реквизитов',
    },
    {
        id: 3,
        link: '#',
        icon: 'person',
        title: 'Глобальные настройки',
        desc: 'Валюта , язык и пароль',
    },
    {
        id: 1,
        link: '#',
        icon: 'notifications',
        title: 'Уведомления',
        desc: 'Ваши уведомления',
    },
];

export const Profile: FC = (): JSX.Element => {
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        isAdmin: false,
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
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
        <div className={s.wrapper}>
            <Heading title="Общая информация" desc="Контактные данные, адреса" />

            <InfoLinks data={linksData} />

            <FormikProvider value={formik}>
                <Form>
                    <FloatingInput {...formik.getFieldProps('firstName')} />

                    <FloatingInput {...formik.getFieldProps('lastName')} iconname="mail" />
                    <FloatingInput {...formik.getFieldProps('email')} />

                    <div>
                        <Button variant={'primary'}>Submit</Button>
                        <Button variant={'primary'}>Reset</Button>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};
