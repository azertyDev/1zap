import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
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
import { useGetFitCatalog } from 'src/hooks/laximoData/useGetFitCar';
import { useFilterSelectFitByCar } from 'src/hooks/laximoData/useFilterSelectFitByCar';

export const FirstFormVim: FC<{ dataCatalog: string; dataModel: string }> = ({
    dataCatalog,
    dataModel,
}): JSX.Element => {
    const { t } = useTranslation();
    const selectValues = useGetSelectValues();
    const {
        push,
        pathname,
        query: { brand },
    } = useRouter();
    const { catalog } = useGetFitCatalog(dataCatalog);
    const [modelSel, setModelSel] = useState(null);

    useFilterSelectFitByCar(
        dataModel,
        setModelSel,
        (val: any) => {
            switch (val.$.name) {
                case 'Модель':
                    return val;
                case 'Серия':
                    return val;
                case 'Vehicle family':
                    return val;
                case 'Семейство':
                    return val;
                case 'Торговое обозначение':
                    return val;
                case 'Vehicle name':
                    return val;
                case 'Model':
                    return val;
            }
        },
        [brand] as string[]
    );

    const formik = useFormik({
        initialValues: formikValues.vimRequest,
        validationSchema: client_validation.vimRequest,
        onSubmit: async (values) => {
            try {
                if (catalog) {
                    for (const obj of catalog) {
                        if (obj.value === brand) {
                            values.brand = obj.label;
                            break;
                        }
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
                console.log({ ...values, phone: values.phone.replaceAll(' ', '') });
                push('/request_vim/final_step');
            } catch (err) {
                console.log(err);
            }
        },
    });
    useEffect(() => {
        push({
            pathname: pathname,
            query: {
                brand: formik.values.brand,
            },
        });
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
                                    label={t('filter:brand')}
                                    options={catalog ? catalog : [{ value: '', label: '' }]}
                                />

                                <InputWrapper>
                                    <Field
                                        component={SelectField}
                                        name="model"
                                        label={t('filter:model')}
                                        options={modelSel ? modelSel : [{ value: ' ', label: ' ' }]}
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
