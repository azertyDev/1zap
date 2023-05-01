import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useStore } from 'src/store/useStore';
import { Button } from 'src/components/ui/button';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { FloatingInput } from 'src/components/ui/input/float_input';
import { StandartInput } from 'src/components/ui/input/standart_input';
import { Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';

import s from '../index.module.scss';
import { IBranchData, IProviderData } from 'types';

interface SecondFormProps {
    initialValues: IProviderData;
    setInitialValues: Dispatch<SetStateAction<IProviderData>>;
    handleTabChange: (value: number) => void;
}

export const SecondForm: FC<SecondFormProps> = ({ initialValues, setInitialValues, handleTabChange }) => {
    const coinsData = [
        {
            id: Date.now() * 1000,
            value: 50,
        },
        {
            id: Date.now() * 1000,
            value: 100,
        },
        {
            id: Date.now() * 1000,
            value: 250,
        },
        {
            id: Date.now() * 1000,
            value: 500,
        },
        {
            id: Date.now() * 1000,
            value: 1000,
        },
    ];
    const {
        push,
        query: { id },
    } = useRouter();
    const { addProvider } = useStore((state) => state);

    const selectCoin = (value: number) => {
        formik.setFieldValue('coin', value);
    };

    const validationSchema = Yup.object().shape({
        legalAddress: Yup.string().min(2, 'more_then_two_words').max(50, 'Too Long!').required('required'),
        phone: Yup.string().required('required'),
        fullName: Yup.string().min(2, 'more_then_two_words').max(50, 'Too Long!').required('required'),
        email: Yup.string().email('Invalid email').required('required'),
        companyName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('required'),
        inn: Yup.string().max(12, 'Too Long!').required('required'),
        coin: Yup.number()
            .label('Coin')
            .typeError(({ label, type }) => `${label} must be a ${type}`)
            .required('required'),
    });

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<typeof initialValues>) => {
        const { coin, applicationId, phone, providerBranch, ...rest } = values;

        const branch = providerBranch.map((branch: IBranchData) => {
            const { phone, ...all } = branch;
            return { phone: phone.replaceAll(' ', ''), ...all };
        });

        const data: IProviderData = {
            coin: Number(coin),
            applicationId: Number(id),
            phone: phone.replaceAll(' ', ''),
            providerBranch: branch,
            ...rest,
        };

        await addProvider(data);
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    useEffect(() => {
        setInitialValues(formik.values);
    }, [formik.values, setInitialValues]);

    const handleSubmit = () => {
        if (formik.dirty || formik.isValid) {
            push('/dashboard/providers');
        }
    };

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
                            <StandartInput
                                isPhone
                                label="dashboard:phone"
                                {...formik.getFieldProps('phone')}
                                setFieldValue={formik.setFieldValue}
                            />
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
                    <Button variant="disabled" type="reset" onClick={() => handleTabChange(1)}>
                        Назад
                    </Button>
                    <Button
                        type="submit"
                        onClick={() => handleSubmit}
                        disabled={!(formik.dirty || formik.isValid || formik.isSubmitting)}
                        variant={!(formik.dirty || formik.isValid) ? 'disabled' : 'primary'}
                    >
                        Готово
                    </Button>
                </div>
            </Form>
        </FormikProvider>
    );
};
