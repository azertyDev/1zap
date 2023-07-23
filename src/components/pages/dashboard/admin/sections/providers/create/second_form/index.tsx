import Router, { useRouter } from 'next/router';
import { Button } from 'src/components/ui/button';
import { Dispatch, FC, SetStateAction } from 'react';
import { FloatingInput } from 'src/components/ui/input/float_input';
import { StandartInput } from 'src/components/ui/input/standart_input';
import { Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';
import { IBranchData, IProviderData } from 'types';
import s from '../index.module.scss';
import { useTranslation } from 'next-i18next';
import { providerApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { client_validation } from 'src/validation/client_validation';
import { providerValuesFirst } from 'components/pages/dashboard/admin/sections/providers/create/first_form/initialValues';

interface SecondFormProps {
    branches: any;
    setBranches: Dispatch<SetStateAction<any>>;
    handleTabChange: (value: number) => void;
}

export const SecondForm: FC<SecondFormProps> = ({ branches, setBranches, handleTabChange }) => {
    const { t } = useTranslation();
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
        query: { id },
    } = useRouter();

    const selectCoin = (value: number) => {
        formik.setFieldValue('coin', value);
    };

    console.log(branches.providerBranch);
    const onSubmit = async (values: FormikValues, {}: FormikHelpers<any>) => {
        const { coin, applicationId, phone, ...rest } = values;

        const branch = branches.providerBranch.map((branch: IBranchData) => {
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

        await providerApi
            .addProvider(data)
            .then(() => {
                toast.success(t('dashboard:providerCreated'), { duration: 5000 });
                Router.push('/dashboard/providers?page=1&pageSec=1');
            })
            .catch(({ response }) => {
                if (response.data.error === 'user allready exist') {
                    toast.error(t('helpers:userAllreadyExist'), { duration: 6000 });
                } else {
                    toast.error(t('helpers:allFields'), { duration: 6000 });
                }
            });
    };

    const formik = useFormik({
        initialValues: providerValuesFirst,
        onSubmit,
        enableReinitialize: true,
        validationSchema: client_validation.create_provider,
    });

    return (
        <FormikProvider value={formik}>
            <Form>
                <h4>{t('dashboard:requisites')}</h4>
                <div className={s.formGroup}>
                    <div className={s.row}>
                        <div className={s.block}>
                            <StandartInput label="dashboard:legalAddress" {...formik.getFieldProps('legalAddress')} />
                            <StandartInput label="dashboard:fullName" {...formik.getFieldProps('fullName')} />
                            <StandartInput label="dashboard:inn" {...formik.getFieldProps('inn')} />
                            <StandartInput label="dashboard:dealNumber" {...formik.getFieldProps('dealNumber')} />
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
                        <h4>{t('dashboard:balanceFilling')}</h4>
                        <div className={s.coins}>
                            {coinsData.map((coin, index) => {
                                return (
                                    <span
                                        key={coin.id * index}
                                        onClick={() => selectCoin(coin.value)}
                                        className={`${s.coin} ${formik.values.coin === coin.value ? s.active : ''}`}
                                    >
                                        {coin.value} {t('dashboard:coins')}
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
                    <Button
                        variant="disabled"
                        type="reset"
                        onClick={() => {
                            handleTabChange(1);
                            setBranches(branches);
                        }}
                    >
                        {t('dashboard:back')}
                    </Button>
                    <Button
                        type="submit"
                        disabled={!(formik.dirty || formik.isValid || formik.isSubmitting)}
                        variant={!(formik.dirty || formik.isValid) ? 'disabled' : 'primary'}
                        disabledPointer={formik.isSubmitting}
                    >
                        {t('dashboard:ready')}
                    </Button>
                </div>
            </Form>
        </FormikProvider>
    );
};
