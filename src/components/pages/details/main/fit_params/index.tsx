import { FC } from 'react';

import s from './index.module.scss';
import { Icon } from 'components/ui/icon';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';

export const FitParams: FC = (): JSX.Element => {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            searchVal: '',
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className={s.form_wr}>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <input
                    {...formik.getFieldProps('searchVal')}
                    type="text"
                    className={s.input}
                    placeholder={t('home:searchOem')!}
                />
                <div className={s.search_icon_res}>
                    <Icon size={24} name={'search'} color={'#C6303C'} />
                </div>

                <button type="submit" className={s.btn}>
                    <Icon size={18} name={'search'} color={'#323232'} />
                    <span>{t('common:search')}</span>
                </button>
            </form>
        </div>
    );
};
