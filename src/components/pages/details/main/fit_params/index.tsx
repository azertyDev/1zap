import { FC } from 'react';

import s from './index.module.scss';
import { Icon } from 'components/ui/icon';
import { useFormik, FormikProvider, Form } from 'formik';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { client_validation } from 'src/validation/client_validation';

export const FitParams: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const {
        push,
        pathname,
        query: { FindVehicle },
    } = useRouter();

    const formik = useFormik({
        initialValues: {
            searchVal: FindVehicle ?? '',
        },
        validationSchema: client_validation.search,
        onSubmit: async (values) => {
            await push(`${pathname}?tab=1&FindVehicle=${values.searchVal}`);
        },
    });

    return (
        <div className={s.form_wr}>
            <FormikProvider value={formik}>
                <Form>
                    <input {...formik.getFieldProps('searchVal')} type="text" placeholder={t('common:findModelVim')!} />
                    <div className={s.search_icon_res}>
                        <Icon size={24} name={'search'} color={'#C6303C'} />
                    </div>

                    <button type="submit" className={s.btn}>
                        <Icon size={18} name={'search'} color={'#323232'} />
                        <span>{t('common:search')}</span>
                    </button>
                </Form>
            </FormikProvider>
        </div>
    );
};
