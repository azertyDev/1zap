import { Field, Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Checkbox } from 'src/components/ui/dashboard/checkbox';
import { BaseModal } from 'src/components/ui/dashboard/modal/base_modal';
import { StatisticsBlock } from 'src/components/ui/dashboard/statistics_block';
import { Icon } from 'src/components/ui/icon';
import { FloatingInput } from 'src/components/ui/input/float_input';
import { SelectField } from 'src/components/ui/select';
import { useModal } from 'src/hooks/common/useModal';
import { useStore } from 'src/store/useStore';

import s from './index.module.scss';

export const PriceList = () => {
    const { providerBranches, fetchProviderBranches } = useStore();
    const [options, setOptions] = useState<[{ value: number | undefined; label: string }]>([
        { value: undefined, label: '' },
    ]);

    const { open, handleModalOpen, handleModalClose } = useModal();

    useEffect(() => {
        providerBranches?.map((branch: IBranchData) => {
            setOptions([{ value: branch.id, label: branch.branchName }]);
        });
    }, [providerBranches]);

    const openModal = () => {
        handleModalOpen();
        fetchProviderBranches();
    };

    const selectOptions = [
        {
            value: 'hyundai',
            label: 'HYUNDAI',
        },
        {
            value: 'kia',
            label: 'KIA',
        },
        {
            value: 'toyota',
            label: 'TOYOTA',
        },
    ];

    const statisticsData = [
        {
            id: 1,
            title: 'Позиций',
            date: 'Обновление 20.10.22',
            count: '10.12',
        },
        {
            id: 2,
            title: 'Переходов',
            date: 'За текущий месяц',
            count: '120',
        },
    ];

    const initialValues = {
        title: '',
        branchId: null,
        currencyType: '',
        clientType: '',
        productType: '',
        availability: '',
        payment: [
            {
                method: 'cash',
                isActive: false,
            },
            {
                method: 'card',
                isActive: false,
            },
            {
                method: 'transfer',
                isActive: false,
            },
        ],
    };

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<typeof initialValues>) => {
        console.log('First form values:', values);
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        // validationSchema,
    });

    return (
        <div className={s.wrapper}>
            <StatisticsBlock data={statisticsData} title={<h4>Текущие показатели</h4>} />

            <div className={s.actionBtns}>
                <Button variant="primary">
                    <Icon name="cloud_download" color="white" />
                    Скачать шаблон
                </Button>
                <Button variant="primary" onClick={openModal}>
                    <Icon name="table_chart" color="white" />
                    Новый прайс лист
                </Button>
                <Button variant="primary">
                    <Icon name="label" color="white" />
                    Разместить рекламу
                </Button>
            </div>

            <BaseModal
                center
                open={open}
                showCloseIcon={false}
                onClose={handleModalClose}
                headerContent={<div className={s.modalHeader}>Новый прайс лист</div>}
            >
                <div className={s.modalContent}>
                    <FormikProvider value={formik}>
                        <Form>
                            <div className={s.form__group}>
                                <FloatingInput {...formik.getFieldProps('title')} title="Название прайс листа" />
                                <Field
                                    component={SelectField}
                                    name="branchId"
                                    label="dashboard:branchId"
                                    options={options}
                                />
                                <Field
                                    component={SelectField}
                                    name="currencyType"
                                    label="dashboard:currency"
                                    options={[
                                        {
                                            value: 'usd',
                                            label: 'Доллары',
                                        },
                                        {
                                            value: 'sum',
                                            label: 'Сум',
                                        },
                                    ]}
                                />
                                <Field
                                    component={SelectField}
                                    name="clientType"
                                    label="dashboard:providerBranch.clientType.title"
                                    options={[
                                        {
                                            value: 'legal',
                                            label: 'Для юрлиц',
                                        },
                                        {
                                            value: 'individual',
                                            label: 'Для физлиц',
                                        },
                                    ]}
                                />
                                <Field
                                    component={SelectField}
                                    name="productType"
                                    label="dashboard:productType"
                                    options={[
                                        {
                                            value: 'parts',
                                            label: 'Запчасти',
                                        },
                                        {
                                            value: 'tires',
                                            label: 'Шины',
                                        },
                                        {
                                            value: 'oils',
                                            label: 'Масло',
                                        },
                                    ]}
                                />
                                <Field
                                    component={SelectField}
                                    name="availability"
                                    label="dashboard:availability"
                                    options={[
                                        {
                                            value: '14-day',
                                            label: 'Поставка от 14 дней',
                                        },
                                    ]}
                                />
                            </div>

                            <div className={s.payment_type}>
                                <p>Способ оплаты</p>
                                <div className={s.checkbox__group}>
                                    <Checkbox
                                        label="providerBranch.payment.cash"
                                        {...formik.getFieldProps('payment[0].isActive')}
                                    />
                                    <Checkbox
                                        label="providerBranch.payment.card"
                                        {...formik.getFieldProps('payment[1].isActive')}
                                    />
                                    <Checkbox
                                        label="providerBranch.payment.transfer"
                                        {...formik.getFieldProps('payment[2].isActive')}
                                    />
                                </div>
                            </div>

                            <div className={s.modalButtons}>
                                <Button variant="primary" fullWidth>
                                    <Icon name="cloud_upload" color="white" />
                                    Загрузить прайс
                                </Button>
                                <Button variant="disabled" type="submit" onClick={() => {}} fullWidth>
                                    Сохранить
                                </Button>
                            </div>
                        </Form>
                    </FormikProvider>
                </div>
            </BaseModal>
        </div>
    );
};
