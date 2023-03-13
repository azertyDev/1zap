import * as Yup from 'yup';
import { Button } from 'src/components/ui/button';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';
import { StandartInput } from 'src/components/ui/input/standart_input';
import { FloatingInput } from 'src/components/ui/input/float_input';
import { axiosInstance } from 'src/utils/axios';

import s from '../index.module.scss';

interface SecondFormProps {
    initialValues: IProviderData;
    setInitialValues: Dispatch<SetStateAction<IProviderData>>;
    handleTabChange: (value: number) => void;
}

export const SecondForm: FC<SecondFormProps> = ({ initialValues, setInitialValues, handleTabChange }) => {
    const coinsData = [
        {
            id: Date.now() * 1000,
            value: '50',
        },
        {
            id: Date.now() * 1000,
            value: '100',
        },
        {
            id: Date.now() * 1000,
            value: '250',
        },
        {
            id: Date.now() * 1000,
            value: '500',
        },
        {
            id: Date.now() * 1000,
            value: '1000',
        },
    ];

    const selectCoin = (value: string) => {
        formik.setFieldValue('coin', value);
    };

    const validationSchema = Yup.object().shape({
        legalAddress: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        phone: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        companyName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        inn: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        coin: Yup.number()
            .positive('Must be a positive value')
            .label('Coin')
            .typeError(({ label, type }) => `${label} must be a ${type}`)
            .required('Required'),
    });

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<typeof initialValues>) => {
        console.log(values);
        await axiosInstance
            .post('/providers/new', values)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit,
        validationSchema,
    });

    useEffect(() => {
        setInitialValues(formik.values);
    }, [formik.values, setInitialValues]);

    return (
        <FormikProvider value={formik}>
            <Form>
                <h4>Реквизиты</h4>
                <div className={s.formGroup}>
                    <div className={s.row}>
                        <div className={s.block}>
                            <StandartInput label="dashboard:legalAddress" {...formik.getFieldProps('legalAddress')} />
                            <StandartInput label="dashboard:fullName" {...formik.getFieldProps('fullName')} />
                            <StandartInput label="dashboard:inn" {...formik.getFieldProps('inn')} />
                        </div>
                        <div className={s.block}>
                            <StandartInput label="dashboard:companyName" {...formik.getFieldProps('companyName')} />
                            <StandartInput label="dashboard:phone" {...formik.getFieldProps('phone')} isPhone />
                            <StandartInput label="dashboard:email" {...formik.getFieldProps('email')} />
                        </div>
                    </div>

                    <div className={s.coinsBlock}>
                        <h4>Пополнение баланса</h4>
                        <div className={s.coins}>
                            {coinsData.map((coin, index) => {
                                return (
                                    <span
                                        key={coin.id * index}
                                        onClick={() => selectCoin(coin.value)}
                                        className={`${s.coin} ${formik.values.coin === coin.value ? s.active : ''}`}
                                    >
                                        {coin.value} Монет
                                    </span>
                                );
                            })}
                        </div>
                        <div className={s.coinInput}>
                            <FloatingInput {...formik.getFieldProps('coin')} iconname="edit" />
                        </div>
                    </div>
                </div>

                <div className={s.actionButtons}>
                    <Button variant={'disabled'} type="reset" onClick={() => handleTabChange(1)}>
                        Назад
                    </Button>
                    <Button variant={'primary'} type="submit">
                        Готова
                    </Button>
                </div>
            </Form>
        </FormikProvider>
    );
};
