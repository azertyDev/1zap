import { Dispatch, FC, SetStateAction, useEffect } from 'react';

import { FormikHelpers, FormikProvider, FormikValues, useFormik, FieldArray, Form } from 'formik';
import { DynamicForm } from './dynamic_form';
import { Button } from 'src/components/ui/button';

import s from '../index.module.scss';
import { IProviderData } from 'types';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

interface FirstFormProps {
    initialValues: IProviderData;
    setInitialValues: Dispatch<SetStateAction<IProviderData>>;
    handleTabChange: (value: number) => void;
}

export const FirstForm: FC<FirstFormProps> = ({ initialValues, setInitialValues, handleTabChange }) => {
    const { t } = useTranslation();

    const { push } = useRouter();

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<typeof initialValues>) => {
        return values;
    };

    const formik = useFormik({
        onSubmit,
        initialValues: initialValues,
        enableReinitialize: true,
        // validationSchema,
    });

    useEffect(() => {
        setInitialValues(formik.values);
    }, [formik.values, setInitialValues]);

    return (
        <FormikProvider value={formik}>
            <Form>
                <FieldArray
                    name="providerBranch"
                    render={(arrayHelpers) => {
                        return <DynamicForm {...arrayHelpers} />;
                    }}
                />
                <div className={s.actionButtons}>
                    <Button
                        variant="disabled"
                        type="reset"
                        onClick={() => push('/dashboard/providers?page=1&pageSec=1')}
                    >
                        {t('common:cancel')}
                    </Button>
                    <Button variant="primary" type="submit" onClick={() => handleTabChange(2)}>
                        {t('common:next')}
                    </Button>
                </div>
            </Form>
        </FormikProvider>
    );
};
