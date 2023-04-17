import { FC, useEffect, useState } from 'react';
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

import { useGetFitCatalog } from 'src/hooks/laximoData/useGetFitCar';
import { useFilterSelectFitByCar } from 'src/hooks/laximoData/useFilterSelectFitByCar';

import { vinOrderApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { formatValuesToSend } from 'src/helpers/formatValuesToSend';

import { getModelSwitchCondition } from 'src/helpers/getModelSwitchCondition';
import { transformSelectOptions } from 'src/helpers/transformSelectOptions';

export const FirstFormVim: FC<{ dataCatalog: string; dataModel: string; staticPar: IStaticParams }> = ({
    dataCatalog,
    dataModel,
    staticPar,
}): JSX.Element => {
    const { t } = useTranslation();

    const {
        push,
        pathname,
        query: { brand },
    } = useRouter();
    const { catalog } = useGetFitCatalog(dataCatalog);
    const [modelSel, setModelSel] = useState(null);
    const [switchBrand, setSwitchBrand] = useState(true);

    useFilterSelectFitByCar(dataModel, setModelSel, getModelSwitchCondition, [brand] as string[]);

    const formik = useFormik({
        initialValues: formikValues.vimRequest,
        validationSchema: client_validation.vimRequest,
        onSubmit: async (values) => {
            setSwitchBrand(false);
            if (catalog) {
                for (const obj of catalog) {
                    if (obj.value === brand) {
                        values.brand = obj.label;
                        break;
                    }
                }

                if (modelSel) {
                    for (const obj of modelSel as any) {
                        if (obj.value === values.model) {
                            values.model = obj.label;
                            break;
                        }
                    }
                }

                const { dataSend } = formatValuesToSend.createVin(values);

                await vinOrderApi
                    .createOrder(dataSend)
                    .then(() => {
                        push('/request_vim/final_step');
                    })
                    .catch(() => {
                        toast.error(t('helpers:error_sending'));
                    });
            }
        },
    });

    useEffect(() => {
        if (formik.values.brand.length > 0 && switchBrand) {
            push({
                pathname: pathname,
                query: {
                    brand: formik.values.brand,
                },
            });
        }
    }, [formik.values.brand]);

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
                                    label={t('common:selects.brand')}
                                    options={catalog ? catalog : [{ value: ' ', label: ' ' }]}
                                />

                                <InputWrapper>
                                    <Field
                                        component={SelectField}
                                        name="model"
                                        label={t('common:selects.model')}
                                        options={modelSel ? modelSel : [{ value: ' ', label: ' ' }]}
                                    />
                                </InputWrapper>
                            </div>
                            <InputWrapper>
                                <FloatingInput {...formik.getFieldProps('yearIssue')} />
                            </InputWrapper>
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
                                        label={t('common:selects.payment')}
                                        options={
                                            staticPar
                                                ? transformSelectOptions(staticPar.payment)
                                                : [
                                                      {
                                                          value: '',
                                                          label: '',
                                                      },
                                                  ]
                                        }
                                    />
                                </InputWrapper>

                                <InputWrapper>
                                    <Field
                                        component={SelectField}
                                        name="city"
                                        label={t('common:selects.city')}
                                        options={
                                            staticPar
                                                ? transformSelectOptions(staticPar.city)
                                                : [
                                                      {
                                                          value: '',
                                                          label: '',
                                                      },
                                                  ]
                                        }
                                    />
                                </InputWrapper>
                            </div>
                        </div>

                        <div>
                            <Field
                                as={'textarea'}
                                name={'description'}
                                placeholder={t('common:describeDetail') as string}
                                className={`${s.textarea} ${
                                    formik.errors.description && formik.touched.description ? s.error : ''
                                }`}
                            />
                        </div>
                    </div>

                    <Button
                        fullWidth
                        type={'submit'}
                        className={s.submit_btn}
                        disabled={!formik.dirty || !formik.isValid}
                        variant={!formik.dirty || !formik.isValid ? 'disabled' : 'primary'}
                    >
                        <Icon size={15} name={'send'} color={!formik.dirty || !formik.isValid ? '#9A9EA7' : '#fff'} />
                        {t('common:sendRequest')}
                    </Button>
                </Form>
            </FormikProvider>
        </div>
    );
};
