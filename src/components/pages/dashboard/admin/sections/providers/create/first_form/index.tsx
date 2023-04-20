import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import * as Yup from 'yup';
import { FormikHelpers, FormikProvider, FormikValues, useFormik, FieldArray, Form } from 'formik';
import { DynamicForm } from './dynamic_form';
import { Button } from 'src/components/ui/button';

import s from '../index.module.scss';

interface FirstFormProps {
    initialValues: IProviderData;
    setInitialValues: Dispatch<SetStateAction<IProviderData>>;
    handleTabChange: (value: number) => void;
}

export const FirstForm: FC<FirstFormProps> = ({ initialValues, setInitialValues, handleTabChange }) => {
    const validationSchema = Yup.object().shape({});

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<typeof initialValues>) => {
        console.log('First form values:', values);
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
                    <Button variant="disabled" type="reset">
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit" onClick={() => handleTabChange(2)}>
                        Далее
                    </Button>
                </div>
            </Form>
        </FormikProvider>
    );
};
