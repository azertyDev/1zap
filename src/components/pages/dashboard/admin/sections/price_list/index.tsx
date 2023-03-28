import { MenuItem } from '@szhsin/react-menu';
import { Field, Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Checkbox } from 'src/components/ui/dashboard/checkbox';
import { BaseModal } from 'src/components/ui/dashboard/modal/base_modal';
import { StatisticsBlock } from 'src/components/ui/dashboard/statistics_block';
import { Icon } from 'src/components/ui/icon';
import { FloatingInput } from 'src/components/ui/input/float_input';
import { Menu } from 'src/components/ui/modal/menu';
import { SelectField } from 'src/components/ui/select';
import { FileUpload } from 'src/components/ui/upload/file';
import { useModal } from 'src/hooks/common/useModal';
import { useStore } from 'src/store/useStore';
import { productsApi } from 'src/utils/api';
import s from './index.module.scss';

interface IOptions {
    value: number | undefined;
    label: string;
}

export const PriceList = () => {
    const { providerBranches, fetchProviderBranches } = useStore();
    const { open, handleModalOpen, handleModalClose } = useModal();

    const branchesOptions: IOptions[] = [];
    const [options, setOptions] = useState<IOptions[]>(branchesOptions);

    useEffect(() => {
        providerBranches?.map((branch: IBranchData) => {
            branchesOptions.push({ value: branch.id, label: branch.branchName });
        });
        setOptions([...branchesOptions]);
    }, [providerBranches]);

    const openModal = () => {
        handleModalOpen();
        fetchProviderBranches();
    };

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

    // const initialValues = {
    //     title: '',
    //     branchId: null,
    //     currencyType: '',
    //     clientType: '',
    //     type: '',
    //     availability: '',
    //     payment: [
    //         {
    //             method: 'cash',
    //             isActive: false,
    //         },
    //         {
    //             method: 'card',
    //             isActive: false,
    //         },
    //         {
    //             method: 'transfer',
    //             isActive: false,
    //         },
    //     ],
    // };
    const initialValues = {
        title: 'Test prices',
        branchId: null,
        currencyType: 'sum',
        clientType: 'individual',
        type: 'part',
        availability: 'from_seven',
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
        const { payment, ...rest } = values;
        console.log('First form values:', values);

        const data = {
            payment: JSON.stringify(payment),
            ...rest,
        };

        productsApi.upload(data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        // validationSchema,
    });

    const menuData = [
        { id: 1, name: 'Запчасти', file: '/assets/files/parts.xlsx' },
        { id: 2, name: 'Масла', file: '/assets/files/oils.xlsx' },
        { id: 3, name: 'Аккумуляторы', file: '/assets/files/battery.xlsx' },
        { id: 4, name: 'Шины', file: '/assets/files/tires.xlsx' },
    ];

    return (
        <div className={s.wrapper}>
            <StatisticsBlock data={statisticsData} title={<h4>Текущие показатели</h4>} />

            <div className={s.actionBtns}>
                <Menu
                    button={
                        <Button variant="primary">
                            <Icon name="cloud_download" color="white" />
                            Скачать шаблон
                        </Button>
                    }
                >
                    <>
                        {menuData.map((menu) => {
                            return (
                                <MenuItem key={menu.id} href={menu.file}>
                                    <Icon name="cloud_download" color="black" />
                                    {menu.name}
                                </MenuItem>
                            );
                        })}
                    </>
                </Menu>
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
                                    name="type"
                                    label="dashboard:productType"
                                    options={[
                                        {
                                            value: 'part',
                                            label: 'Запчасти',
                                        },
                                        {
                                            value: 'tire',
                                            label: 'Шины',
                                        },
                                        {
                                            value: 'oil',
                                            label: 'Масло',
                                        },
                                        {
                                            value: 'battery',
                                            label: 'Аккумулятор',
                                        },
                                    ]}
                                />
                                <Field
                                    component={SelectField}
                                    name="availability"
                                    label="dashboard:availability"
                                    options={[
                                        {
                                            value: 'from_seven',
                                            label: 'Поставка от 7 дней',
                                        },
                                        {
                                            value: 'from_fourteen',
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
                                <FileUpload name="file" title="Загрузить прайс" setFieldValue={formik.setFieldValue} />

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
