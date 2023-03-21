import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'next-i18next';

import s from './index.module.scss';
import { Form, FormikProvider, useFormik } from 'formik';
import { Field } from 'formik';
import { FloatingInput } from 'components/ui/input/float_input';

import { Button } from 'components/ui/button';
import { InputWrapper } from 'components/ui/input/input_wrapper';
import { Icon } from 'components/ui/icon';
import { Title } from 'components/ui/title';
import { SelectField } from 'components/ui/select';
import { formikValues } from 'src/constants/formik_values';
import { client_validation } from 'src/validation/client_validation';
import { useRouter } from 'next/router';
import { useGetSelectValues } from 'src/hooks/common/useGetSelectValues';

export const FirstFormVim: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const selectValues = useGetSelectValues();
    const { push } = useRouter();

    const formik = useFormik({
        initialValues: formikValues.vimRequest,
        validationSchema: client_validation.vimRequest,
        onSubmit: async (values) => {
            try {
                console.log(values);
                push('/request_vim/final_step');
            } catch (err) {
                console.log(err);
            }
        },
    });

    return (
        <div className={s.first_form_wr}>
            <Title className={s.title} main>
                {t('common:searchDetailVin')}
            </Title>

            <FormikProvider value={formik}>
                <Form>
                    <div className={s.first_form}>
                        <div>
                            <InputWrapper>
                                <FloatingInput {...formik.getFieldProps('vinNumber')} />
                            </InputWrapper>
                            <div className={s.inputs_wr}>
                                <Field
                                    component={SelectField}
                                    name="brand"
                                    label={t('filter:brand')}
                                    options={[
                                        {
                                            value: 'FERRARY',
                                            label: 'FERRARY',
                                        },
                                        {
                                            value: 'BMW',
                                            label: 'BMW',
                                        },
                                    ]}
                                />

                                <InputWrapper>
                                    <Field
                                        component={SelectField}
                                        name="model"
                                        label={t('filter:model')}
                                        options={[
                                            {
                                                value: 'FERRARY',
                                                label: 'FERRARY',
                                            },
                                            {
                                                value: 'BMW',
                                                label: 'BMW',
                                            },
                                        ]}
                                    />
                                </InputWrapper>

                                <InputWrapper>
                                    <FloatingInput {...formik.getFieldProps('yearIssue')} />
                                </InputWrapper>
                                <InputWrapper>
                                    <FloatingInput {...formik.getFieldProps('modification')} />
                                </InputWrapper>
                            </div>
                            <div className={s.inputs_wr}>
                                <InputWrapper>
                                    <FloatingInput {...formik.getFieldProps('username')} />
                                </InputWrapper>
                                <InputWrapper>
                                    <FloatingInput {...formik.getFieldProps('phone')} isPhone />
                                </InputWrapper>
                                <InputWrapper>
                                    <Field
                                        component={SelectField}
                                        name="payment"
                                        label={t('filter:payment')}
                                        options={selectValues.payment}
                                    />
                                </InputWrapper>

                                <InputWrapper>
                                    <Field
                                        component={SelectField}
                                        name="city"
                                        label={t('filter:city')}
                                        options={selectValues.city}
                                    />
                                </InputWrapper>
                            </div>
                        </div>

                        <div>
                            <textarea
                                className={s.textarea}
                                name={'description'}
                                onChange={formik.handleChange}
                                placeholder={t('common:describeDetail') as string}
                            ></textarea>

                            {!formik.values.image ? (
                                <>
                                    <label htmlFor={'file'} className={s.file_label}>
                                        <Icon size={20} name={'backup'} color={'#fff'} />
                                        {t('common:downloadPhoto')}
                                    </label>
                                    <input
                                        onChange={(ev) => formik.setFieldValue('image', ev.target.files)}
                                        id={'file'}
                                        accept={'image/*'}
                                        type={'file'}
                                        className={s.file_input}
                                    />
                                </>
                            ) : (
                                <Button
                                    variant={'primary'}
                                    type={'button'}
                                    onClick={() => formik.setFieldValue('image', null)}
                                >
                                    {t('common:deletePhoto')}
                                </Button>
                            )}
                        </div>
                    </div>

                    <Button variant={'primary'} type={'submit'} className={s.submit_btn}>
                        <Icon size={15} name={'send'} color={'#fff'} />
                        {t('common:sendRequest')}
                    </Button>
                </Form>
            </FormikProvider>
        </div>
    );
};
