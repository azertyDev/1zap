import { FC } from 'react';
import s from './index.module.scss';

import { useTranslation } from 'next-i18next';
import { useFormik } from 'formik';

import { Icon } from 'components/ui/icon';

export const SearchDetails: FC<{ className: string }> = ({
    className,
}): JSX.Element => {
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
        <>
            <div className={className}>
                <form onSubmit={formik.handleSubmit}>
                    <button type="submit" className={s.big_search_img}>
                        <Icon size={30} name={'search'} color={'#fff'} />
                    </button>

                    <input
                        {...formik.getFieldProps('searchVal')}
                        type="text"
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
        </>
    );
};
