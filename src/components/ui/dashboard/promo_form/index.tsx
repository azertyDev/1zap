import { Field, Form, FormikHelpers, FormikProps, FormikProvider, FormikValues, useFormik } from 'formik';
import { promoApi } from 'src/utils/api';
import * as Yup from 'yup';
import { ChangeEvent, FC, useEffect } from 'react';
import s from './index.module.scss';
import { SelectField } from 'components/ui/select';
import { IBranchData } from 'types';
import { useStore } from 'src/store/useStore';
import { useTranslation } from 'next-i18next';

interface IOptions {
    label: string;
    value: number | undefined | string;
}

export const PromoForm: FC<{
    formik: FormikProps<any>;
    branchesOptions?: IOptions[] | null;
    lists?: IOptions[] | null;
    disableList?: boolean;
    disableBranch?: boolean;
    disableTextarea?: boolean;
}> = ({ formik, branchesOptions, disableList = false, lists, disableBranch, disableTextarea = false }) => {
    const symbolsLimit = 80;
    const { t } = useTranslation();

    const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        formik.setFieldValue(name, value);
    };

    return (
        <FormikProvider value={formik}>
            <Form className={s.form}>
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
                    <Field
                        component={SelectField}
                        name="price"
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
                </div>

                <div className={s.desc_block}>
                    <p>{t('dashboard:promo_text_ru')}</p>
                    <div className={s.textarea_wr}>
                        <textarea
                            name="descriptionRu"
                            onChange={handleTextarea}
                            value={formik.values.descriptionRu}
                            cols={20}
                            rows={2}
                            wrap="hard"
                            maxLength={symbolsLimit}
                            disabled={disableTextarea}
                        />
                        <span className={s.symbolCount}>
                            {formik.values.descriptionRu.length}/{symbolsLimit}
                        </span>
                    </div>
                </div>

                <div className={s.desc_block}>
                    <p>{t('dashboard:promo_text_uz')}</p>
                    <div className={s.textarea_wr}>
                        <textarea
                            name="descriptionUz"
                            onChange={handleTextarea}
                            cols={20}
                            value={formik.values.descriptionUz}
                            rows={2}
                            wrap="hard"
                            maxLength={symbolsLimit}
                            disabled={disableTextarea}
                        />
                        <span className={s.symbolCount}>
                            {formik.values.descriptionUz.length}/{symbolsLimit}
                        </span>
                    </div>
                </div>
            </Form>
        </FormikProvider>
    );
};
