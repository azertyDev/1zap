import { useRouter } from 'next/router';
import { Heading } from 'src/components/ui/dashboard/heading';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import s from './index.module.scss';
import { PromoForm } from 'components/ui/dashboard/promo_form';
import { client_validation } from 'src/validation/client_validation';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';
import { Button } from 'components/ui/button';
import Link from 'next/link';

interface IOptions {
    label: string;
    value: number | undefined;
}

export const EditForm = () => {
    const { t } = useTranslation();

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<any>) => {};

    const formik = useFormik({
        onSubmit,
        enableReinitialize: true,
        initialValues: {
            descriptionRu: '',
            descriptionUz: '',
        },
        validationSchema: client_validation.promo,
    });

    return (
        <div className={s.root}>
            <Heading title={t('dashboard:edit_promo')} desc={t('dashboard:edit_promo_text')} />
            <PromoForm formik={formik} disableBranch disableList />
            <div className={s.buttons_wr}>
                <Link href={'/cabinet/promo'}>
                    <Button type="button" variant={'disabled'} fullWidth>
                        {t('common:cancel')}
                    </Button>
                </Link>

                <Button
                    type="submit"
                    onClick={() => formik.submitForm()}
                    disabled={!(formik.isValid && formik.dirty)}
                    fullWidth
                    variant={!(formik.isValid && formik.dirty) ? 'disabled' : 'primary'}
                >
                    {t('dashboard:refresh')}
                </Button>
            </div>
        </div>
    );
};
