import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { promoApi } from 'src/utils/api';
import { useStore } from 'src/store/useStore';
import { Button } from 'src/components/ui/button';
import { SelectField } from 'src/components/ui/select';
import { ChangeEvent, useEffect, useMemo } from 'react';
import { Heading } from 'src/components/ui/dashboard/heading';
import { Field, Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';
import s from './index.module.scss';
import { IBranchData } from 'types';
import { selectDefaultVal } from 'src/constants/ selectDefaultVal';

interface IOptions {
    label: string;
    value: number | undefined;
}

export const BranchForm = () => {
    const { query } = useRouter();
    const { providerBranches, fetchProviderBranches } = useStore();
    const branchesOptions: IOptions[] = [];
    const symbolsLimit = 80;

    useEffect(() => {
        fetchProviderBranches();
    }, [fetchProviderBranches]);

    providerBranches?.map((branch: IBranchData) => {
        branchesOptions.push({ value: branch.id, label: branch.branchName });
    });

    const defaultOptions = [
        {
            value: 'all',
            label: 'Все',
        },
    ];

    const initialValues = {
        branchId: '',
        price: '',
        descriptionRu: '',
        descriptionUz: '',
    };

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<typeof initialValues>) => {
        await promoApi
            .branch(values)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const validationSchema = Yup.object({
        branchId: Yup.string().required('Required'),
        descriptionRu: Yup.string()
            .min(3, 'Must be at least 3 characters')
            .max(20, 'Must be 80 characters or less')
            .required('Required'),
        descriptionUz: Yup.string()
            .min(3, 'Must be at least 3 characters')
            .max(20, 'Must be 80 characters or less')
            .required('Required'),
    });

    const formik = useFormik({
        onSubmit,
        initialValues,
        validationSchema,
    });

    const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value, name } = e.target;

        formik.setFieldValue(name, value);
    };

    return (
        <div className={s.root}>
            <Heading title={query.params as string} desc="Промо-текст на все позиции филиала" />
            <FormikProvider value={formik}>
                <Form>
                    <div className={s.select_row}>
                        <Field
                            component={SelectField}
                            name="branchId"
                            label="dashboard:branch"
                            options={branchesOptions}
                        />
                        <Field
                            component={SelectField}
                            name="price"
                            label="dashboard:price-list"
                            options={defaultOptions}
                            isDisabled
                        />
                    </div>

                    <div className={s.desc_block}>
                        <p>Текст промо на русском языке</p>
                        <div className={s.textarea_wr}>
                            <textarea
                                name="descriptionRu"
                                onChange={handleTextarea}
                                cols={20}
                                rows={2}
                                wrap="hard"
                                maxLength={symbolsLimit}
                            />
                            <span className={s.symbolCount}>
                                {formik.values.descriptionRu.length}/{symbolsLimit}
                            </span>
                        </div>
                    </div>

                    <div className={s.desc_block}>
                        <p>Текст промо на узбекском языке</p>
                        <div className={s.textarea_wr}>
                            <textarea
                                name="descriptionUz"
                                onChange={handleTextarea}
                                cols={20}
                                rows={2}
                                wrap="hard"
                                maxLength={symbolsLimit}
                            />
                            <span className={s.symbolCount}>
                                {formik.values.descriptionUz.length}/{symbolsLimit}
                            </span>
                        </div>
                    </div>
                </Form>
            </FormikProvider>

            <div className={s.info_block}>
                <div>
                    <p className={s.info_block_coin}>
                        <span>500 монет</span> Размещение на 30 дней
                    </p>
                    <div className={s.info_block_details}>
                        <div>
                            <span>Промо позиций</span>
                            <span>45</span>
                        </div>
                        <div>
                            <span>Размер скидки</span>
                            <span>0%</span>
                        </div>
                    </div>
                </div>

                <div className={s.additional}>
                    <span>Промо будет опубликовано после проверки модератором портала</span>
                    <Button
                        type="submit"
                        onClick={() => formik.submitForm()}
                        disabled={!(formik.isValid && formik.dirty)}
                        variant={!(formik.isValid && formik.dirty) ? 'disabled' : 'primary'}
                    >
                        Опубликовать
                    </Button>
                </div>
            </div>
        </div>
    );
};
