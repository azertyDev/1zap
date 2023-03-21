import { FC } from 'react';

import s from './index.module.scss';
import { Icon } from 'components/ui/icon';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { getLaximoData } from 'src/function/getLaximoData';
import { useRouter } from 'next/router';

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
        onSubmit: async (values) => {
            await push(`${pathname}?FindVehicle=${values.searchVal}`);
        },
    });

    return (
        <div className={s.form_wr}>
            <form onSubmit={formik.handleSubmit}>
                <input {...formik.getFieldProps('searchVal')} type="text" placeholder={t('home:searchOem')!} />
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
