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
import { client_validation } from 'src/validation/client_validation';

interface IOptions {
    value: number | undefined;
    label: string;
}

export const PriceCreateForm: FC<any> = (props) => {
    const { t } = useTranslation();
    const { fetchPriceList } = useStore();
    const [isSubmiting, setIsSubmiting] = useState(false);
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
        file: '',
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
        setIsSubmiting(true);

        productsApi
            .upload(data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then(() => {
                props.handleModalClose();
                formik.resetForm();
                fetchPriceList();
                setIsSubmiting(false);
            })
            .catch(({ response }) => {
                setIsSubmiting(false);
                console.log(response);
                toast.error(
                    response.data.error
                        ? t(`helpers:${response.data.error.replaceAll(' ', '_')}`)
                        : t(`helpers:error_sending`)
                );
            });
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: client_validation.price_list,
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
                                label: t('common:usd'),
                            },
                            {
                                value: 'sum',
                                label: t('common:sum'),
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
                                label: t('common:for_legal'),
                            },
                            {
                                value: 'individual',
                                label: t('common:for_people'),
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
                                label: t('common:partSelection'),
                            },
                            {
                                value: 'tire',
                                label: t('common:tires'),
                            },
                            {
                                value: 'oil',
                                label: t('common:oil'),
                            },
                            {
                                value: 'battery',
                                label: t('common:batteries'),
                            },
                        ]}
                    />
                    <Field
                        component={SelectField}
                        name="availability"
                        label="dashboard:availability"
                        options={[
                            {
                                value: 'in_stock',
                                label: t('dashboard:in_stock'),
                            },
                            {
                                value: 'order',
                                label: t('common:selects.order'),
                            },
                            {
                                value: 'one_three_day',
                                label: t('common:selects.one_three_day'),
                            },
                            {
                                value: 'up_seven_day',
                                label: t('common:selects.up_seven_day'),
                            },
                            {
                                value: 'up_thirty_day',
                                label: t('common:selects.up_thirty_day'),
                            },
                        ]}
                    />
                </div>

                <div className={s.payment_type}>
                    <p>{t('dashboard:providerBranch.payment.title')}</p>
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
                    <FileUpload
                        name="file"
                        title={t('dashboard:download_price')}
                        setFieldValue={formik.setFieldValue}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        disabled={!formik.dirty || !formik.isValid}
                        variant={!formik.dirty || !formik.isValid ? 'disabled' : 'primary'}
                        disabledPointer={isSubmiting}
                    >
                        {t('common:save')}
                    </Button>
                </div>
            </Form>
        </FormikProvider>
    );
};
