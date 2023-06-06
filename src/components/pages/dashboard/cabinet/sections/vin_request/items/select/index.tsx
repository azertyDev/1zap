import { Field, Form, FormikProvider, useFormik } from 'formik';
import { InputWrapper } from 'components/ui/input/input_wrapper';
import { SelectField } from 'components/ui/select';
import s from 'components/pages/dashboard/cabinet/sections/vin_request/accepted/index.module.scss';
import { Button } from 'components/ui/button';
import { useTranslation } from 'next-i18next';
import React, { Dispatch, FC, SetStateAction, useCallback, useEffect } from 'react';
import { vinOrderApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';

export const VinSelectProvider: FC<{
    status: string;
    vinId: number;
    children: React.ReactNode;
    closeModal: () => void;
    trigger: Dispatch<SetStateAction<boolean>>;
    setOrder: (num: number) => () => void;
    modalOrder: number;
    open: boolean;
}> = ({ status, vinId, children, closeModal, trigger, setOrder, modalOrder, open }) => {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: { status: status, reason: '', description: '' },
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (values.status === 'completed' && status !== 'completed') {
                vinOrderApi
                    .completeVinByProvider(vinId)
                    .then((response) => {
                        closeModal();
                        trigger((prev) => !prev);
                        toast.success(t('helpers:vin_compl'));
                    })
                    .catch((err) => {
                        toast.error(t('helpers:error_sending'));
                    });
            }
            if (values.status === 'rejected') {
                setOrder(3)();
            }
        },
    });

    const handleRejectVin = async () => {
        if (
            (formik.values.reason === 'other' || formik.values.reason === 'client_reject') &&
            formik.values.description.length === 0
        ) {
            toast.error(t('dashboard:vin_reject_problem'));
            return;
        }

        vinOrderApi
            .rejectVinByProvider(vinId, {
                description: formik.values.description,
                reason: formik.values.reason,
            })
            .then((response) => {
                toast.success(t('helpers:vin_reject'));
                closeModal();
                trigger((prev) => !prev);
            })
            .catch((err) => {
                toast.error(t('helpers:error_sending'));
            });
    };

    useEffect(() => {
        formik.resetForm();
    }, [open]);

    return (
        <FormikProvider value={formik}>
            <Form>
                {formik.values.status !== 'rejected' && (
                    <>
                        <InputWrapper>
                            <Field
                                component={SelectField}
                                name="status"
                                label={t('common:selects.status')}
                                options={
                                    status === 'completed'
                                        ? [
                                              {
                                                  value: 'completed',
                                                  label: t('dashboard:status.completed'),
                                              },
                                          ]
                                        : [
                                              {
                                                  value: 'accepted',
                                                  label: t('dashboard:status.accepted'),
                                              },
                                              {
                                                  value: 'completed',
                                                  label: t('dashboard:status.completed'),
                                              },
                                              { value: 'rejected', label: t('dashboard:status.rejected') },
                                          ]
                                }
                            />
                        </InputWrapper>
                    </>
                )}
                {formik.values.status === 'rejected' && (
                    <>
                        <InputWrapper>
                            <Field
                                component={SelectField}
                                name="status"
                                label={t('common:selects.status')}
                                options={
                                    modalOrder === 3
                                        ? [
                                              {
                                                  value: 'rejected',
                                                  label: t('dashboard:status.rejected'),
                                              },
                                          ]
                                        : [
                                              {
                                                  value: 'accepted',
                                                  label: t('dashboard:status.accepted'),
                                              },
                                              {
                                                  value: 'completed',
                                                  label: t('dashboard:status.completed'),
                                              },
                                              { value: 'rejected', label: t('dashboard:status.rejected') },
                                          ]
                                }
                            />
                        </InputWrapper>

                        {modalOrder === 3 && (
                            <>
                                <Field
                                    component={SelectField}
                                    name="reason"
                                    label={t('dashboard:reject_res_noun')}
                                    options={[
                                        {
                                            value: 'not_agree_price',
                                            label: t('dashboard:reject_res.not_agree_price'),
                                        },
                                        {
                                            value: 'not_agree_deadlines',
                                            label: t('dashboard:reject_res.not_agree_deadlines'),
                                        },
                                        {
                                            value: 'uncomfortable_location',
                                            label: t('dashboard:reject_res.uncomfortable_location'),
                                        },
                                        { value: 'not_through', label: t('dashboard:reject_res.not_through') },
                                        { value: 'wrong_contact', label: t('dashboard:reject_res.wrong_contact') },
                                        { value: 'client_reject', label: t('dashboard:reject_res.client_reject') },
                                        { value: 'other', label: t('dashboard:reject_res.other') },
                                    ]}
                                />
                                {(formik.values.reason === 'other' || formik.values.reason === 'client_reject') && (
                                    <Field
                                        as={'textarea'}
                                        name={'description'}
                                        placeholder={t('dashboard:vin_reject_problem') as string}
                                        className={s.textarea}
                                    />
                                )}

                                <div className={s.control_btns}>
                                    <Button
                                        variant={formik.values.reason.length > 0 ? 'primary' : 'disabled'}
                                        disabled={formik.values.reason.length === 0}
                                        fullWidth
                                        onClick={handleRejectVin}
                                        type={'button'}
                                    >
                                        {t('dashboard:req_reject')}
                                    </Button>
                                    <Button variant={'disabled'} fullWidth type={'button'} onClick={closeModal}>
                                        {t('common:close')}
                                    </Button>
                                </div>
                            </>
                        )}
                    </>
                )}

                {modalOrder !== 3 && (
                    <div className={s.control_btns}>
                        {children}

                        {status !== 'completed' && (
                            <Button
                                disabled={!formik.dirty || !formik.isValid}
                                variant={!formik.dirty || !formik.isValid ? 'disabled' : 'primary'}
                                fullWidth
                                type={'submit'}
                            >
                                {t('common:save')}
                            </Button>
                        )}
                    </div>
                )}
            </Form>
        </FormikProvider>
    );
};
