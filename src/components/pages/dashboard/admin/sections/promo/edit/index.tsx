import { useRouter } from 'next/router';
import { Heading } from 'src/components/ui/dashboard/heading';
import { Field, Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';
import s from './index.module.scss';
import { PromoForm } from 'components/ui/dashboard/promo_form';
import { client_validation } from 'src/validation/client_validation';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';
import { Button } from 'components/ui/button';
import React, { FC, useEffect, useState } from 'react';
import { promoApi } from 'src/utils/api';
import { useModal } from 'src/hooks/common/useModal';
import { BaseModal } from 'components/ui/dashboard/modal/base_modal';
import dayjs from 'dayjs';
import { SelectField } from 'components/ui/select';
import { useGetBranchesAndPriceLists } from 'src/hooks/promo/useGetBranchesAndPriceLists';

interface IOptions {
    label: string;
    value: number | undefined;
}

export const EditPromoForm: FC<{ query: { id: number; type: string } }> = ({ query }) => {
    const { t } = useTranslation();
    const {
        push,
        query: { type },
    } = useRouter();
    const [dataStat, setDataStat] = useState<any>(null);
    const [dataFormik, setDataFormik] = useState<any>(null);
    const { open, handleModalClose, handleModalOpen } = useModal();
    const [isEdit, setEdit] = useState(false);

    const { formikBranches, formikPrice, branches, lists } = useGetBranchesAndPriceLists(
        false,
        false,
        dataFormik,
        [{ value: '', label: dataFormik?.branchName }],
        [{ value: '', label: dataFormik?.pricelistName }]
    );

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<any>) => {
        if (isEdit) {
            promoApi
                .editPromoByAdmin(query.id, {
                    descriptionRu: values.descriptionRu,
                    descriptionUz: values.descriptionUz,
                })
                .catch(() => toast.error(t('helpers:error_sending')));
        }

        promoApi
            .acceptPromoByAdmin(query.id)
            .then(() => {
                toast.success(t('dashboard:promo_accepted'));
                push('/dashboard/promo?page=1&pageSec=1');
            })
            .catch(() => toast.error(t('helpers:error_sending')));
    };
    const formik = useFormik({
        onSubmit,
        enableReinitialize: true,
        initialValues: {
            descriptionRu: dataFormik ? dataFormik.textRu : '',
            descriptionUz: dataFormik ? dataFormik.textUz : '',
        },
        validationSchema: client_validation.promo,
    });

    const formikReject = useFormik({
        initialValues: { reason: '', description: '' },
        onSubmit: async (values) => {
            promoApi
                .rejectPromoByAdmin(query.id, values)
                .then(() => {
                    toast.success(t('dashboard:promo_rejected'));
                    push('/dashboard/promo?page=1&pageSec=1');
                })
                .catch(() => toast.error(t('helpers:error_sending')));
        },
    });

    useEffect(() => {
        (async () => {
            promoApi
                .getSinglePromoAdmin(query.id)
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
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, []);

    return (
        <div>
            <Heading title={t('dashboard:moderation_promo')} desc={''} />
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

            {dataFormik && (
                <PromoForm
                    formik={formikBranches}
                    formikPrice={formikPrice}
                    formikTexts={formik}
                    branchesOptions={branches}
                    lists={lists}
                    disableBranch
                    disableList
                    disableTextarea={type === 'active' || !isEdit}
                />
            )}

            <div className={s.buttons_wr}>
                <Button
                    type="button"
                    variant={'disabled'}
                    fullWidth
                    onClick={() => push('/dashboard/promo?page=1&pageSec=1')}
                >
                    {t('common:cancel')}
                </Button>

                {query.type === 'moderation' && (
                    <>
                        <Button type="submit" onClick={handleModalOpen} fullWidth variant={'primary'}>
                            {t('dashboard:deny')}
                        </Button>

                        <Button type="button" variant={'primary'} fullWidth onClick={() => setEdit(true)}>
                            {t('dashboard:edit')}
                        </Button>

                        <Button
                            type="submit"
                            onClick={() => formik.submitForm()}
                            fullWidth
                            variant={'primary'}
                            disabledPointer={formik.isSubmitting}
                        >
                            {t('dashboard:publish')}
                        </Button>
                    </>
                )}
            </div>

            <BaseModal
                open={open}
                onClose={handleModalClose}
                headerContent={
                    <div>
                        <h2>{t('dashboard:reject_promo')}</h2>
                        <span>
                            {dataFormik && (
                                <>
                                    {dayjs(dataFormik.createdAt).format('DD/MM/YYYY')}{' '}
                                    {t('common:in', { time: dayjs(dataFormik.createdAt).format('h:mm') })}
                                </>
                            )}
                        </span>
                    </div>
                }
            >
                <FormikProvider value={formikReject}>
                    <Form>
                        <Field
                            component={SelectField}
                            name="reason"
                            label="dashboard:reject_res_noun"
                            options={[
                                {
                                    value: 'grammar',
                                    label: t('dashboard:reasons_reject_promo.grammar'),
                                },
                                {
                                    value: 'contact_in_text',
                                    label: t('dashboard:reasons_reject_promo.contact_in_text'),
                                },
                                {
                                    value: 'trans_err',
                                    label: t('dashboard:reasons_reject_promo.trans_err'),
                                },
                                {
                                    value: 'service_err',
                                    label: t('dashboard:reasons_reject_promo.service_err'),
                                },
                                {
                                    value: 'other',
                                    label: t('dashboard:reasons_reject_promo.other'),
                                },
                            ]}
                        />
                        <Field
                            as={'textarea'}
                            name={'description'}
                            placeholder={t('dashboard:desc_reason') as string}
                            className={s.textarea}
                        />
                        <div className={s.modal_btn_wr}>
                            <Button
                                disabled={!formikReject.dirty || !formikReject.isValid}
                                variant={!formikReject.dirty || !formikReject.isValid ? 'disabled' : 'primary'}
                                fullWidth
                                type={'submit'}
                                disabledPointer={formikReject.isSubmitting}
                            >
                                {t('dashboard:refuse_public')}
                            </Button>

                            <Button fullWidth variant={'disabled'} type={'button'} onClick={handleModalClose}>
                                {t('common:close')}
                            </Button>
                        </div>
                    </Form>
                </FormikProvider>
            </BaseModal>
        </div>
    );
};
