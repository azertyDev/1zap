import { Dispatch, FC, SetStateAction, useEffect } from 'react';

import { FormikHelpers, FormikProvider, FormikValues, useFormik, FieldArray, Form } from 'formik';
import { DynamicForm } from './dynamic_form';
import { Button } from 'src/components/ui/button';

import s from '../index.module.scss';
import { IProviderData } from 'types';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { client_validation } from 'src/validation/client_validation';

interface FirstFormProps {
    branches: any;
    setBranches: Dispatch<SetStateAction<any>>;
    handleTabChange: (value: number) => void;
}

export const FirstForm: FC<FirstFormProps> = ({ setBranches, branches, handleTabChange }) => {
    const { t } = useTranslation();
    const { push } = useRouter();

    const formik = useFormik({
        onSubmit(val) {},
        initialValues: branches,
        enableReinitialize: true,
        validateOnMount: true,
        validationSchema: client_validation.create_provider_branch,
    });

    const handleButtonClick = () => {
        if (!formik.errors || formik.isValid) {
            handleTabChange(2);
            setBranches(formik.values);
        }
    };

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
                    <Button
                        disabled={!(formik.dirty || formik.isValid)}
                        variant={!(formik.dirty || formik.isValid) ? 'disabled' : 'primary'}
                        type="submit"
                        onClick={() => handleButtonClick()}
                    >
                        {t('common:next')}
                    </Button>
                </div>
            </Form>
        </FormikProvider>
    );
};
