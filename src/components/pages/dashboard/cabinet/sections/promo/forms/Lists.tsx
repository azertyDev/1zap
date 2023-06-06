import { useRouter } from 'next/router';
import { branchApi, promoApi } from 'src/utils/api';
import { useStore } from 'src/store/useStore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Heading } from 'src/components/ui/dashboard/heading';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import s from './index.module.scss';
import { IBranchData } from 'types';
import { PromoForm } from 'components/ui/dashboard/promo_form';
import { formikValues } from 'src/constants/formik_values';
import { client_validation } from 'src/validation/client_validation';
import { PromoSubmitInfo } from 'components/ui/dashboard/promo_submit_info';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

interface IOptions {
    label: string;
    value: number | undefined;
}

export const ListsForm = () => {
    const { t } = useTranslation();

    const {
        locale,
        push,
        pathname,
        query,
        query: { page },
    } = useRouter();

    const [branches, setBranches] = useState<IOptions[] | null>(null);
    const [lists, setLists] = useState<IOptions[] | null>(null);

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<any>) => {
        await promoApi
            .addPromoByBranch(values)
            .then((res) => {
                push('/cabinet/promo');
            })
            .catch((err) => {
                toast.error(t('helpers:error_sending'));
            });
    };

    const formik = useFormik({
        onSubmit,
        enableReinitialize: true,
        initialValues: {
            branchId: null,
            price: lists && lists.length > 0 ? lists[0].value : null,
            descriptionRu: '',
            descriptionUz: '',
        },
        validationSchema: client_validation.promo,
    });

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
                    formik.setFieldValue('branchId', val[0].value);
                })
                .catch(() => {
                    toast.error(t('helpers:error_getting'));
                });
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (formik.values.branchId) {
                promoApi
                    .getPriceListByBranch(formik.values.branchId as number)
                    .then((res) => {
                        if (res.length === 0) {
                            toast.error(t('dashboard:no_price_list'));
                        }

                        const val1 = res.map((subitem: { id: number; title: string }) => ({
                            value: subitem.id,
                            label: subitem.title,
                        }));
                        setLists(val1);
                    })
                    .catch(() => {
                        toast.error(t('helpers:error_getting'));
                    });
            }
        })();
    }, [formik.values.branchId]);

    return (
        <div className={s.root}>
            <Heading title={t('dashboard:promo_place')} desc={t('dashboard:promo_texts.all_price_list')} />
            <PromoForm formik={formik} branchesOptions={branches} lists={lists} />
            <PromoSubmitInfo formik={formik} info={{ coin: 20, discount: 2, position: 13 }} />
        </div>
    );
};
