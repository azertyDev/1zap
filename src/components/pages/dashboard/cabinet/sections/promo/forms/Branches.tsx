import { useRouter } from 'next/router';
import { branchApi, promoApi } from 'src/utils/api';
import { useStore } from 'src/store/useStore';
import { useEffect, useMemo, useState } from 'react';
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

export const BranchForm = () => {
    const { t } = useTranslation();
    const { push } = useRouter();

    const [branches, setBranches] = useState<IOptions[] | null>(null);

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
            branchId: branches ? branches[0].value : '',
            descriptionRu: '',
            descriptionUz: '',
        },
        validationSchema: client_validation.promo,
    });

    return (
        <div className={s.root}>
            <Heading title={t('dashboard:promo_place')} desc={t('dashboard:promo_texts.all_branches')} />
            <PromoForm formik={formik} branchesOptions={branches} disableList />
            <PromoSubmitInfo formik={formik} info={{ coin: 1000, discount: 0, position: 13 }} />
        </div>
    );
};
