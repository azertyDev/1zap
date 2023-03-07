import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { Title } from 'components/ui/title';
import s from './index.module.scss';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { InputWrapper } from 'components/ui/input/input_wrapper';
import { FloatingInput } from 'components/ui/input/float_input';
import { SelectField } from 'components/ui/select';

import { Button } from 'components/ui/button';
import { formikValues } from 'src/constants/formik_values';
import { client_validation } from 'src/validation/client_validation';
import { useRouter } from 'next/router';

export const SecondFormVim: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const { push } = useRouter();

    const formik = useFormik({
        initialValues: formikValues.vimRequest[1],
        validationSchema: client_validation.vimRequest[1].secondForm,
        onSubmit: async (values) => {
            try {
                push('/request_vim/second_step/final_step');
                console.log(values);
            } catch (err) {
                console.log(err);
            }
        },
    });

    return (
        <div className={s.sec_form}>
            <Title className={s.title} main>
                {t('common:contactsData')}
            </Title>

            <FormikProvider value={formik}>
                <Form>
                    <InputWrapper>
                        <FloatingInput name={'username'} />
                    </InputWrapper>
                    <InputWrapper>
                        <FloatingInput name={'surname'} />
                    </InputWrapper>
                    <InputWrapper>
                        <FloatingInput name={'phone'} isPhone />
                    </InputWrapper>
                    <InputWrapper>
                        <FloatingInput name={'email'} />
                    </InputWrapper>

                    <div className={s.selects_wr}>
                        <InputWrapper>
                            <Field
                                component={SelectField}
                                name="face"
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
                                name="city"
                                label={t('common:city')}
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
                    </div>

                    <div className={s.buttons_wr}>
                        <Button variant={'disabled'}>
                            {t('common:cancel')}
                        </Button>

                        <Button variant={'primary'} type={'submit'}>
                            {t('common:next')}
                        </Button>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};
