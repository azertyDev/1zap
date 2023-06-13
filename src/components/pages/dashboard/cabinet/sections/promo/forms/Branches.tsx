import { useRouter } from 'next/router';
import { promoApi } from 'src/utils/api';
import { Heading } from 'src/components/ui/dashboard/heading';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import s from './index.module.scss';
import { PromoForm } from 'components/ui/dashboard/promo_form';
import { client_validation } from 'src/validation/client_validation';
import { PromoSubmitInfo } from 'components/ui/dashboard/promo_submit_info';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';
import { useGetBranchesAndPriceLists } from 'src/hooks/promo/useGetBranchesAndPriceLists';
import { useGetBranchInfo } from 'src/hooks/promo/useGetBranchInfo';

export const BranchForm = () => {
    const { t } = useTranslation();
    const { push } = useRouter();

    const { formikBranches, formikPrice, branches, lists } = useGetBranchesAndPriceLists(true, false);
    const { branchInfo } = useGetBranchInfo(formikBranches, formikBranches.values.branchId);

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<any>) => {
        await promoApi
            .addPromoByBranch({ ...values, ...formikBranches.values })
            .then((res) => {
                push('/cabinet/promo?page=1');
            })
            .catch((err) => {
                toast.error(t('helpers:error_sending'));
            });
    };

    const formik = useFormik({
        onSubmit,
        enableReinitialize: true,
        initialValues: {
            descriptionRu: branchInfo.textRu ? branchInfo.textRu : '',
            descriptionUz: branchInfo.textUz ? branchInfo.textUz : '',
        },
        validationSchema: client_validation.promo,
    });

    return (
        <div className={s.root}>
            <Heading title={t('dashboard:promo_place')} desc={t('dashboard:promo_texts.all_branches')} />
            <PromoForm
                formik={formikBranches}
                formikPrice={formikPrice}
                formikTexts={formik}
                branchesOptions={branches}
                lists={lists}
                disableList
                disableTextarea={branchInfo.hasReclam}
            />

            {!branchInfo.hasReclam && (
                <PromoSubmitInfo formik={formik} info={{ coin: 1000, discount: 0, position: branchInfo.total }} />
            )}
        </div>
    );
};
