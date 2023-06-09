import { useRouter } from 'next/router';
import { Heading } from 'src/components/ui/dashboard/heading';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import s from './index.module.scss';
import { PromoForm } from 'components/ui/dashboard/promo_form';
import { client_validation } from 'src/validation/client_validation';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';
import { Button } from 'components/ui/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { promoApi } from 'src/utils/api';
import dayjs from 'dayjs';
import { useGetBranchesAndPriceLists } from 'src/hooks/promo/useGetBranchesAndPriceLists';

interface IOptions {
    label: string;
    value: number | undefined;
}

export const EditForm = () => {
    const { t } = useTranslation();
    const { push, query } = useRouter();
    const [dataStat, setDataStat] = useState<any>(null);
    const [dataFormik, setDataFormik] = useState<any>(null);

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<any>) => {
        promoApi
            .editPromoByProvider(query.id as string, values)
            .then((res) => push('/cabinet/promo'))
            .catch(() => toast.error(t('helpers:error_sending')));
    };
    const { formikBranches, formikPrice, branches, lists } = useGetBranchesAndPriceLists(false, false);

    const formik = useFormik({
        onSubmit,
        enableReinitialize: true,
        initialValues: {
            descriptionRu: dataFormik ? dataFormik.textRu : '',
            descriptionUz: dataFormik ? dataFormik.textUz : '',
        },
        validationSchema: client_validation.promo,
    });

    useEffect(() => {
        (async () => {
            promoApi
                .getSinglePromoProvider(query.id as string)
                .then((res) => {
                    setDataFormik(res);
                    setDataStat([
                        {
                            date: res.status,
                            count: res.cost,
                        },
                        {
                            date: res.expiredAt,
                            count: res.expired,
                        },
                        {
                            date: res.type,
                            count: res.position,
                        },
                    ]);
                })
                .catch((err) => toast.error(t('helpers:error_getting')));
        })();
    }, []);

    return (
        <div>
            <Heading title={t('dashboard:edit_promo')} desc={t('dashboard:edit_promo_text')} />
            {dataStat && (
                <div className={s.statistic_wr}>
                    <div className={s.counter}>
                        <div>
                            <p>{t('dashboard:price_add')}</p>
                            <span> {t(`dashboard:promo_status.${dataStat[0].date}`)}</span>
                        </div>
                        <p>{dataStat[0].count}</p>
                    </div>
                    <div className={s.counter}>
                        <div>
                            <p>{t('dashboard:left_days')}</p>
                            <span>{t('dashboard:till', { till: dayjs(dataStat[1].date).format('DD.MM.YYYY') })}</span>
                        </div>
                        <p>{dataStat[1].count}</p>
                    </div>
                    <div className={s.counter}>
                        <div>
                            <p>{t('dashboard:position')}</p>
                            <span> {t(`dashboard:promo_type_texts.${dataStat[2].date}`)}</span>
                        </div>
                        <p>{dataStat[2].count}</p>
                    </div>
                </div>
            )}

            <PromoForm
                formikPrice={formikPrice}
                formikTexts={formik}
                formik={formikBranches}
                disableBranch
                disableList
            />
            <div className={s.buttons_wr}>
                <Link href={'/cabinet/promo'}>
                    <Button type="button" variant={'disabled'} fullWidth>
                        {t('common:cancel')}
                    </Button>
                </Link>

                <Button
                    disabled={!formik.dirty || !formik.isValid}
                    variant={!formik.dirty || !formik.isValid ? 'disabled' : 'primary'}
                    fullWidth
                    type={'submit'}
                    onClick={() => formik.submitForm()}
                >
                    {t('dashboard:refresh')}
                </Button>
            </div>
        </div>
    );
};
