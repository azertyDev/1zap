import { Field, Form, FormikHelpers, FormikProvider, useFormik } from 'formik';
import { Heading } from 'src/components/ui/dashboard/heading';
import { Button } from 'src/components/ui/button';
import { SelectField } from 'src/components/ui/select';
import { selectDefaultVal } from 'src/constants/ selectDefaultVal';
import { FloatingInput } from 'src/components/ui/input/float_input';
import s from '../index.module.scss';
import { BaseSwitch } from 'src/components/ui/switch/BaseSwitch';
import { useTranslation } from 'next-i18next';

export const Settings = (props: any) => {
    const { pageProps } = props;
    const { t } = useTranslation();

    const initialValues = {
        phone: '',
        email: '',
        new_password: '',
        new_password_repeat: '',
    };

    const onSubmit = async (values: any, {}: FormikHelpers<typeof initialValues>) => {
        console.log(values);
    };

    const formik = useFormik({
        onSubmit,
        initialValues: initialValues,
        // validationSchema,
        enableReinitialize: true,
    });

    return (
        <div>
            <Heading title={t(`dashboard:${pageProps.title}`)} desc={t(`dashboard:${pageProps.desc}`)} />

            <FormikProvider value={formik}>
                <Form>
                    <div className={s.block}>
                        <div className={s.row}>
                            <div>
                                <p className={s.blockName}>{t('dashboard:lang_email')}</p>
                                <div className={`${s.block}`}>
                                    <Field
                                        component={SelectField}
                                        name="branchType"
                                        label={t('dashboard:lang_cabinet')}
                                        options={selectDefaultVal}
                                    />
                                    <FloatingInput {...formik.getFieldProps('email')} iconname="edit" />
                                </div>
                            </div>

                            <div>
                                <p className={s.blockName}>{t('dashboard:set_new_password')}</p>
                                <div className={`${s.block}`}>
                                    <FloatingInput {...formik.getFieldProps('new_password')} iconname="lock" />
                                    <FloatingInput {...formik.getFieldProps('new_password_repeat')} iconname="edit" />
                                </div>
                            </div>
                        </div>

                        <div className={s.row}>
                            <div>
                                <p className={s.blockName}>{t('dashboard:notifications')}</p>
                                <div className={`${s.block}`}>
                                    <div className={s.notification_block}>
                                        <span>{t('dashboard:not_balance')}</span>
                                        <div>
                                            <p>{t('dashboard:not_ziro')}</p>
                                            <BaseSwitch />
                                        </div>
                                    </div>
                                    <div className={s.notification_block}>
                                        <span>{t('dashboard:not_listing')}</span>
                                        <div>
                                            <p className={s.disabled}>{t('dashboard:not_listing_day')}</p>

                                            <BaseSwitch disabled />
                                        </div>
                                    </div>
                                    <div className={s.notification_block}>
                                        <span>{t('dashboard:not_request')}</span>
                                        <div>
                                            <p>{t('dashboard:get_not_request')}</p>

                                            <BaseSwitch checked />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={s.actionButtons}>
                            <Button variant="disabled" type="reset">
                                {t('common:cancel')}
                            </Button>
                            <Button
                                type="submit"
                                disabled={!(formik.dirty || formik.isValid || formik.isSubmitting)}
                                variant={!(formik.dirty || formik.isValid) ? 'disabled' : 'primary'}
                            >
                                {t('dashboard:refresh')}
                            </Button>
                        </div>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};
