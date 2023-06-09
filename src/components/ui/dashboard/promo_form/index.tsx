import { Field, Form, FormikProps, FormikProvider } from 'formik';
import React, { ChangeEvent, FC } from 'react';
import s from './index.module.scss';
import { SelectField } from 'components/ui/select';
import { useTranslation } from 'next-i18next';

interface IOptions {
    label: string;
    value: number | undefined | string;
}

export const PromoForm: FC<{
    formik: FormikProps<any>;
    formikPrice: FormikProps<any>;
    formikTexts: FormikProps<any>;
    branchesOptions?: IOptions[] | null;
    lists?: IOptions[] | null;
    disableList?: boolean;
    disableBranch?: boolean;
    disableTextarea?: boolean;
}> = ({
    formik,
    branchesOptions,
    disableList = false,
    lists,
    disableBranch,
    disableTextarea = false,
    formikPrice,
    formikTexts,
}) => {
    const symbolsLimit = 80;
    const { t } = useTranslation();

    const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        formikTexts.setFieldValue(name, value);
    };

    return (
        <div className={s.form}>
            <div className={s.select_row}>
                <FormikProvider value={formik}>
                    <Form>
                        <div className={s.select_row}>
                            <Field
                                component={SelectField}
                                name="branchId"
                                label="dashboard:branch"
                                options={
                                    branchesOptions
                                        ? branchesOptions
                                        : [
                                              {
                                                  value: 'all',
                                                  label: t('common:selects.all'),
                                              },
                                          ]
                                }
                                isDisabled={disableBranch}
                            />
                        </div>
                    </Form>
                </FormikProvider>

                <FormikProvider value={formikPrice}>
                    <Form>
                        <Field
                            component={SelectField}
                            name="pricelistId"
                            label="dashboard:price-list"
                            options={
                                lists
                                    ? lists
                                    : [
                                          {
                                              value: 'all',
                                              label: t('common:selects.all'),
                                          },
                                      ]
                            }
                            isDisabled={disableList}
                        />
                    </Form>
                </FormikProvider>
            </div>

            <FormikProvider value={formikTexts}>
                <Form>
                    <div className={s.desc_block}>
                        <p>{t('dashboard:promo_text_ru')}</p>
                        <div className={s.textarea_wr}>
                            <textarea
                                name="descriptionRu"
                                onChange={handleTextarea}
                                value={formikTexts.values.descriptionRu}
                                cols={20}
                                rows={2}
                                wrap="hard"
                                maxLength={symbolsLimit}
                                disabled={disableTextarea}
                            />
                            <span className={s.symbolCount}>
                                {formikTexts.values.descriptionRu.length}/{symbolsLimit}
                            </span>
                        </div>
                    </div>
                </Form>
            </FormikProvider>
            <FormikProvider value={formikTexts}>
                <Form>
                    <div className={s.desc_block}>
                        <p>{t('dashboard:promo_text_uz')}</p>
                        <div className={s.textarea_wr}>
                            <textarea
                                name="descriptionUz"
                                onChange={handleTextarea}
                                cols={20}
                                value={formikTexts.values.descriptionUz}
                                rows={2}
                                wrap="hard"
                                maxLength={symbolsLimit}
                                disabled={disableTextarea}
                            />
                            <span className={s.symbolCount}>
                                {formikTexts.values.descriptionUz.length}/{symbolsLimit}
                            </span>
                        </div>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};
