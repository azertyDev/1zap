import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'next-i18next';

import s from './index.module.scss';
import { Form, FormikProvider, useFormik } from 'formik';
import { Field } from 'formik';
import { FloatingInput } from 'src/components/ui/input/float_input';

import { Button } from 'components/ui/button';
import { InputWrapper } from 'components/ui/input/input_wrapper';
import { Icon } from 'components/ui/icon';
import { Title } from 'components/ui/title';
import { SelectField } from 'components/ui/select';
import { formikValues } from 'src/constants/formik_values';
import { client_validation } from 'src/validation/client_validation';
import { useRouter } from 'next/router';

export const FirstFormVim: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const { push } = useRouter();

    const formik = useFormik({
        initialValues: formikValues.vimRequest[0],
        validationSchema: client_validation.vimRequest[0].firstForm,
        onSubmit: async (values) => {
            try {
                console.log(values);
                push('/request_vim/second_step');
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
                                <FloatingInput
                                    {...formik.getFieldProps('vinNumber')}
                                />
                            </InputWrapper>
                            <InputWrapper>
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
                            </InputWrapper>

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

                            <div className={s.inputs_wr}>
                                <InputWrapper>
                                    <FloatingInput
                                        {...formik.getFieldProps('yearIssue')}
                                    />
                                </InputWrapper>
                                <InputWrapper>
                                    <FloatingInput
                                        {...formik.getFieldProps(
                                            'modification'
                                        )}
                                    />
                                </InputWrapper>
                            </div>
                        </div>

                        <div>
                            <textarea
                                className={s.textarea}
                                name={'description'}
                                onChange={formik.handleChange}
                                placeholder={
                                    t('common:describeDetail') as string
                                }
                            ></textarea>

                            {!formik.values.image ? (
                                <>
                                    <label
                                        htmlFor={'file'}
                                        className={s.file_label}
                                    >
                                        <Icon
                                            size={20}
                                            name={'backup'}
                                            color={'#fff'}
                                        />
                                        {t('common:downloadPhoto')}
                                    </label>
                                    <input
                                        onChange={(ev) =>
                                            formik.setFieldValue(
                                                'image',
                                                ev.target.files
                                            )
                                        }
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
                                    onClick={() =>
                                        formik.setFieldValue('image', null)
                                    }
                                >
                                    {t('common:deletePhoto')}
                                </Button>
                            )}
                        </div>
                    </div>

                    <Button
                        variant={'primary'}
                        type={'submit'}
                        className={s.submit_btn}
                    >
                        {t('common:next')}
                    </Button>
                </Form>
            </FormikProvider>
        </div>
    );
};
