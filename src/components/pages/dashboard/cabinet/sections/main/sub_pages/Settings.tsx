import { Form, FormikHelpers, FormikProvider, useFormik } from 'formik';
import { Heading } from 'src/components/ui/dashboard/heading';
import { Button } from 'src/components/ui/button';
import { FloatingInput } from 'src/components/ui/input/float_input';
import s from '../index.module.scss';
import { BaseSwitch } from 'src/components/ui/switch/BaseSwitch';
import { useTranslation } from 'next-i18next';
import { providerApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { useStore } from 'src/store/useStore';
import { InputWrapper } from 'components/ui/input/input_wrapper';
import { client_validation } from 'src/validation/client_validation';

export const Settings = (props: any) => {
    const { pageProps } = props;
    const { t } = useTranslation();
    const { logout } = useStore();
    const initialValues = {
        balance: false,
        listing: false,
        request: false,
    };

    const formik = useFormik({
        onSubmit() {},
        initialValues: initialValues,
        enableReinitialize: true,
    });

    const formikPassword = useFormik({
        onSubmit(values) {
            providerApi
                .editPasswordByProvider(values)
                .then(() => {
                    toast.success(t('helpers:to_home'), { duration: 5000 });
                    setTimeout(() => {
                        logout();
                    }, 5000);
                })
                .catch(() => toast.error(t('helpers:data_err')));
        },
        initialValues: {
            newPassword: '',
            oldPassword: '',
        },
        validationSchema: client_validation.password_reset,
    });

    return (
        <div>
            <Heading title={t(`dashboard:${pageProps.title}`)} desc={t(`dashboard:${pageProps.desc}`)} />
            <div className={s.forms_wr}>
                <div>
                    <p className={s.blockName}>{t('dashboard:notifications')}</p>
                    <FormikProvider value={formik}>
                        <Form>
                            <div className={s.notification_block}>
                                <span>{t('dashboard:not_balance')}</span>
                                <div>
                                    <p className={!formik.values.balance ? s.disabled : ''}>
                                        {t('dashboard:not_ziro')}
                                    </p>
                                    <BaseSwitch {...formik.getFieldProps('balance')} />
                                </div>
                            </div>
                            <div className={s.notification_block}>
                                <span>{t('dashboard:not_listing')}</span>
                                <div>
                                    <p className={!formik.values.listing ? s.disabled : ''}>
                                        {t('dashboard:not_listing_day')}
                                    </p>

                                    <BaseSwitch {...formik.getFieldProps('listing')} />
                                </div>
                            </div>
                            <div className={s.notification_block}>
                                <span>{t('dashboard:not_request')}</span>
                                <div>
                                    <p className={!formik.values.request ? s.disabled : ''}>
                                        {t('dashboard:get_not_request')}
                                    </p>
                                    <BaseSwitch {...formik.getFieldProps('request')} />
                                </div>
                            </div>
                            <div className={s.actionButtons}>
                                <Button
                                    type="submit"
                                    disabled={!(formik.dirty || formik.isValid || formik.isSubmitting)}
                                    variant={!(formik.dirty || formik.isValid) ? 'disabled' : 'primary'}
                                >
                                    {t('dashboard:refresh')}
                                </Button>
                            </div>
                        </Form>
                    </FormikProvider>
                </div>

                <div>
                    <p className={s.blockName}>{t('dashboard:set_new_password')}</p>
                    <div className={`${s.block}`}>
                        <FormikProvider value={formikPassword}>
                            <Form>
                                <InputWrapper>
                                    <FloatingInput {...formikPassword.getFieldProps('newPassword')} iconname="lock" />
                                </InputWrapper>
                                <InputWrapper>
                                    <FloatingInput {...formikPassword.getFieldProps('oldPassword')} iconname="edit" />
                                </InputWrapper>

                                <Button
                                    type="submit"
                                    disabled={
                                        !(formikPassword.dirty || formikPassword.isValid || formikPassword.isSubmitting)
                                    }
                                    variant={!(formikPassword.dirty || formikPassword.isValid) ? 'disabled' : 'primary'}
                                >
                                    {t('dashboard:refresh')}
                                </Button>
                            </Form>
                        </FormikProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};
