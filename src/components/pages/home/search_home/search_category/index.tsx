import { FC } from 'react';

import s from './index.module.scss';

import { useTranslation } from 'next-i18next';
import { useFormik } from 'formik';
import Link from 'next/link';

import { Icon } from 'components/ui/icon';

export const SearchCategory: FC<{ className: string }> = ({
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
            <div className={s.categ_links_res}>
                <Link href={'#'}>{t('common:batteries')}</Link>
                <Link href={'#'}>{t('common:oil')}</Link>
                <Link href={'#'}>{t('common:tires')}</Link>
            </div>
            <div className={className}>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        {...formik.getFieldProps('searchVal')}
                        type="text"
                        className={`${s.input_categ}`}
                        placeholder={t('home:searchTitle')!}
                    />
                    <div className={s.search_icon_res}>
                        <Icon size={24} name={'search'} color={'#C6303C'} />
                    </div>
                    <button type="submit" className={s.big_search_img}>
                        <Icon size={30} name={'search'} color={'#fff'} />
                    </button>
                </form>
                <div className={s.categ_links}>
                    <Link href={'#'}>{t('common:batteries')}</Link>
                    <Link href={'#'}>{t('common:oil')}</Link>
                    <Link href={'#'}>{t('common:tires')}</Link>
                </div>
            </div>
        </>
    );
};
