import s from './index.module.scss';
import { PromoForm } from 'components/ui/dashboard/promo_form';
import { client_validation } from 'src/validation/client_validation';
import { PromoSubmitInfo } from 'components/ui/dashboard/promo_submit_info';
import { useTranslation } from 'next-i18next';
import { mathPromo } from 'src/helpers/mathPromo';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import { Heading } from 'components/ui/dashboard/heading';
import { useGetBranchesAndPriceLists } from 'src/hooks/promo/useGetBranchesAndPriceLists';
import { useGetPriceListInfo } from 'src/hooks/promo/useGetPriceListInfo';
import { promoApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useGetBranchInfo } from 'src/hooks/promo/useGetBranchInfo';

export const ListsForm = () => {
    const { t } = useTranslation();
    const { push } = useRouter();
    const { formikBranches, formikPrice, branches, lists } = useGetBranchesAndPriceLists();
    const { branchInfo } = useGetBranchInfo(formikBranches, formikBranches.values.branchId);
    const onSubmit = async (values: FormikValues, {}: FormikHelpers<any>) => {
        promoApi
            .addPromoByPriceList({ ...values, ...formikPrice.values })
            .then((res) => {
                push('/cabinet/promo?page=1');
            })
            .catch((err) => {
                if (err.response.data.error === 'insufficient funds') {
                    toast.error(t('dashboard:no_coins'));
                } else toast.error(t('helpers:error_sending'));
            });
    };

    const { listInfo } = useGetPriceListInfo(formikPrice, formikPrice.values.pricelistId);

    const formikTexts = useFormik({
        onSubmit,
        enableReinitialize: true,
        initialValues: {
            descriptionRu: listInfo.textRu || branchInfo.textRu ? listInfo.textRu ?? branchInfo.textRu : '',
            descriptionUz: listInfo.textUz || branchInfo.textUz ? listInfo.textUz ?? branchInfo.textUz : '',
        },
        validationSchema: client_validation.promo,
    });

    return (
        <div className={s.root}>
            <Heading title={t('dashboard:promo_place')} desc={t('dashboard:promo_texts.all_price_list')} />

            <PromoForm
                formik={formikBranches}
                formikPrice={formikPrice}
                formikTexts={formikTexts}
                branchesOptions={branches}
                disableTextarea={listInfo.hasReclam || branchInfo.hasReclam}
                lists={lists}
            />
            {!branchInfo.hasReclam && !listInfo.hasReclam && (
                <PromoSubmitInfo
                    formik={formikTexts}
                    info={{ ...mathPromo(listInfo.total * 5), position: listInfo.total }}
                />
            )}
            {(listInfo.hasReclam || branchInfo.hasReclam) && (
                <div className={s.has_promo}>
                    <h5>{t('dashboard:has_promo')}</h5>
                </div>
            )}
        </div>
    );
};
