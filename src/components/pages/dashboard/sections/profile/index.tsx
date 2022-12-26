import { FC } from 'react';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from 'formik';
import { Heading } from 'src/components/ui/dashboard/heading';
import { InfoLinks } from 'src/components/ui/dashboard/info_links';
import { FloatingInput } from 'src/components/ui/float_input';
import s from './index.module.scss';

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
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const onSubmit = async (
        values: FormikValues,
        {}: FormikHelpers<typeof initialValues>
    ) => {
        console.log(values);
    };

    return (
        <div className={s.wrapper}>
            <Heading
                title="Общая информация"
                desc="Контактные данные, адреса"
            />

            <InfoLinks data={linksData} />

            <Formik
                onSubmit={onSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {(props: FormikProps<typeof initialValues>) => (
                    <Form>
                        <FloatingInput name="firstName" />
                        <FloatingInput name="lastName" />
                        <FloatingInput name="email" />
                    </Form>
                )}
            </Formik>
        </div>
    );
};
