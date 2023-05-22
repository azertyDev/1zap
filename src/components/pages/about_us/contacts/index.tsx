import { AboutMenu } from 'components/pages/about_us/items/menu';
import { AboutTitle } from 'components/pages/about_us/items/title';
import { Container } from 'components/ui/container';
import { useTranslation } from 'next-i18next';

import s from './index.module.scss';
import { Map } from 'pigeon-maps';

import { maptiler } from 'pigeon-maps/providers';

import { formikValues } from 'src/constants/formik_values';
import { client_validation } from 'src/validation/client_validation';

import { Field, Form, FormikProvider, useFormik } from 'formik';
import { InputWrapper } from 'components/ui/input/input_wrapper';
import { FloatingInput } from 'components/ui/input/float_input';
import { Button } from 'components/ui/button';
import { Icon } from 'components/ui/icon';

const maptilerProvider = maptiler('Qlx00jY8FseHxRsxC7Dn', 'dataviz-light');
export const ContactsPage = () => {
    const { t } = useTranslation();
    const formik = useFormik({
        initialValues: formikValues.contact,
        validationSchema: client_validation.contact,
        onSubmit: async (values) => {},
    });

    return (
        <div>
            <AboutMenu />
            <Container>
                <AboutTitle>{t('about:connect_us')}</AboutTitle>
                <div className={s.wr}>
                    <div>
                        <p className={s.par_one}>1Zap Technologies</p>
                        <p className={s.par_two}>Узбекистан ,Ташкент</p>
                        <div className={s.map}>
                            <Map
                                provider={maptilerProvider}
                                defaultCenter={[41.31172327941058, 69.2818072781773]}
                                defaultZoom={15}
                            ></Map>
                        </div>
                        <div className={s.par_onecontact_data_wr}>
                            <div>
                                <p className={s.par_one}>{t('about:phone')}</p>
                                <a href={'tel:+998900000000'} className={s.par_two}>
                                    +998900000000
                                </a>
                            </div>
                            <div>
                                <p className={s.par_one}>{t('about:email')}</p>
                                <a href={'mailto:support@1zap.com'} className={s.par_two}>
                                    support@1zap.uz
                                </a>
                            </div>
                            <div>
                                <p className={s.par_one}>Telegram</p>
                                <a href={'mailto:support@1zap.com'} className={s.par_two}>
                                    @1zap.uz
                                </a>
                            </div>
                            <div>
                                <p className={s.par_one}>Instagram</p>
                                <a href={'mailto:support@1zap.com'} className={s.par_two}>
                                    @1zap.uz
                                </a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <FormikProvider value={formik}>
                            <Form>
                                <InputWrapper>
                                    <FloatingInput {...formik.getFieldProps('username')} />
                                </InputWrapper>

                                <InputWrapper>
                                    <FloatingInput {...formik.getFieldProps('email')} />
                                </InputWrapper>

                                <Field
                                    as={'textarea'}
                                    name={'description'}
                                    placeholder={t('common:your_message') as string}
                                    className={`${s.textarea} ${
                                        formik.errors.description && formik.touched.description ? s.error : ''
                                    }`}
                                />

                                <Button
                                    fullWidth
                                    type={'submit'}
                                    className={s.submit_btn}
                                    disabled={!formik.dirty || !formik.isValid}
                                    variant={!formik.dirty || !formik.isValid ? 'disabled' : 'primary'}
                                >
                                    <Icon
                                        size={15}
                                        name={'send'}
                                        color={!formik.dirty || !formik.isValid ? '#9A9EA7' : '#fff'}
                                    />
                                    {t('common:sendMessage')}
                                </Button>
                            </Form>
                        </FormikProvider>
                    </div>
                </div>
            </Container>
        </div>
    );
};
