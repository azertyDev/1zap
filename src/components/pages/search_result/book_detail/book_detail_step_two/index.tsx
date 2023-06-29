import React, { FC, useState } from 'react';
import s from './index.module.scss';
import { Icon } from 'components/ui/icon';
import { useTranslation } from 'next-i18next';
import { Completed } from 'components/ui/completed';
import { FloatingInput } from 'components/ui/input/float_input';
import { Button } from 'components/ui/button';
import { IconsWrapper } from 'components/ui/icons_wrapper';
import { client_validation } from 'src/validation/client_validation';
import { Form, FormikProvider, useFormik } from 'formik';
import { useStore } from 'src/store/useStore';
import { orderDetails } from 'src/utils/api';
import { toast } from 'react-hot-toast';

export const BookDetailStepTwo: FC<{
    handleOrder: (val: number) => () => void;
    toggleBookDetail: (val: boolean) => () => void;
}> = ({ toggleBookDetail, handleOrder }): JSX.Element => {
    const { t } = useTranslation();
    const { productId, providerId } = useStore((state) => state);
    const [done, setDone] = useState(false);
    const [phoneVal, setPhoneVal] = useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            providerId: providerId,
            productId: productId,
        },
        validationSchema: client_validation.book,
        onSubmit: (values) => {
            orderDetails
                .order({ ...values, phone: values.phone.replaceAll(' ', '') })
                .then(() => {
                    setDone(true);
                    setPhoneVal(values.phone);
                })
                .catch((err) => toast.error(t('helpers:error_sending')));
        },
    });

    return (
        <div className={s.inner}>
            <div className={s.header}>
                <p className={s.header_title}>{t('common:orderingDetail')}</p>

                <div onClick={toggleBookDetail(false)}>
                    <Icon size={19} name={'close'} />
                </div>
            </div>

            <div className={`${s.header_res}`}>
                {!done && (
                    <IconsWrapper size={'medium'} onClick={handleOrder(1)}>
                        <Icon size={16} name={'chevron_left'} />
                    </IconsWrapper>
                )}

                <p className={s.header_title}>{t('common:ordering')}</p>

                <IconsWrapper size={'medium'} onClick={toggleBookDetail(false)}>
                    <Icon size={16} name={'close'} />
                </IconsWrapper>
            </div>
            <div className={s.book_wr}>
                <Completed
                    smallTitle
                    title={done ? 'thanks' : 'orderDetail'}
                    img={<Icon size={done ? 20 : 40} name={done ? 'done' : 'email'} />}
                >
                    <p>{done ? t('common:phoneSms', { phone: phoneVal }) : t('common:smsSend')}</p>
                </Completed>
                {!done && (
                    <div className={s.book_form}>
                        <FormikProvider value={formik}>
                            <Form>
                                <div className={s.inputs_wr}>
                                    <FloatingInput {...formik.getFieldProps('name')} />
                                    <FloatingInput {...formik.getFieldProps('phone')} isPhone />
                                </div>

                                <Button
                                    fullWidth
                                    type={'submit'}
                                    disabled={!formik.dirty || !formik.isValid}
                                    variant={!formik.dirty || !formik.isValid ? 'disabled' : 'primary'}
                                    disabledPointer={formik.isSubmitting}
                                >
                                    {t('common:toOrder')}
                                </Button>
                            </Form>
                        </FormikProvider>
                    </div>
                )}
                {done && (
                    <Button onClick={toggleBookDetail(false)} fullWidth variant={'primary'}>
                        {t('common:continueSearch')}
                    </Button>
                )}
            </div>
        </div>
    );
};
