import { Field, Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from 'src/components/ui/button';
import { Checkbox } from 'src/components/ui/dashboard/checkbox';
import { FloatingInput } from 'src/components/ui/input/float_input';
import { SelectField } from 'src/components/ui/select';
import { FileUpload } from 'src/components/ui/upload/file';
import { useStore } from 'src/store/useStore';
import { branchApi, productsApi } from 'src/utils/api';
import { IBranchData } from 'types';
import s from '../index.module.scss';

interface IOptions {
    value: number | undefined;
    label: string;
}

export const PriceCreateForm: FC<any> = (props) => {
    const { t } = useTranslation();
    const { fetchPriceList, providerBranches } = useStore();
    // const branchesOptions: IOptions[] = useMemo(() => [], []);
    // const [options, setOptions] = useState<IOptions[]>(branchesOptions);
    //
    // useEffect(() => {
    //     providerBranches?.map((branch: IBranchData) => {
    //         branchesOptions.push({ value: branch.id, label: branch.branchName });
    //     });
    //     setOptions([...branchesOptions]);
    // }, [branchesOptions]);
    const [branches, setBranches] = useState(null);

    useEffect(() => {
        (async () => {
            branchApi
                .getAllBranches()
                .then((res) => {
                    const val = res.map((item: { id: number; branchName: string }) => ({
                        value: item.id,
                        label: item.branchName,
                    }));
                    setBranches(val);
                })
                .catch(() => {
                    toast.error(t('helpers:error_getting'));
                });
        })();
    }, []);

    const initialValues = {
        title: '',
        branchId: null,
        currencyType: '',
        clientType: '',
        type: '',
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
        const { payment, ...rest } = values;

        const data = {
            payment: JSON.stringify(payment),
            ...rest,
        };

        productsApi
            .upload(data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then(() => {
                fetchPriceList();
                props.handleModalClose();
                toast.success('Successfully uploaded');
            })
            .catch(({ response }) => {
                toast.error(
                    response.data.error
                        ? t(`helpers:${response.data.error.replaceAll(' ', '_')}`)
                        : 'Error while uploading'
                );
            });
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        // validationSchema,
    });

    return (
        <FormikProvider value={formik}>
            <Form>
                <div className={s.form__group}>
                    <FloatingInput {...formik.getFieldProps('title')} title={t('common.price_list_name')!} />
                    {branches && (
                        <Field component={SelectField} name="branchId" label="dashboard:branch" options={branches} />
                    )}
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

                    <Button
                        fullWidth
                        type="submit"
                        disabled={!formik.dirty || !formik.isValid}
                        variant={!formik.dirty || !formik.isValid ? 'disabled' : 'primary'}
                    >
                        Сохранить
                    </Button>
                </div>
            </Form>
        </FormikProvider>
    );
};
