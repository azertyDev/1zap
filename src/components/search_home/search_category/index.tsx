import { FC } from 'react';

import s from '../index.module.scss';

import { useTranslation } from 'next-i18next';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';

export const SearchCategory: FC = (): JSX.Element => {
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
                    name="searchVal"
                    type="text"
                    className={`${s.input} ${s.input_categ}`}
                    placeholder={t('home:searchTitle')!}
                    onChange={formik.handleChange}
                    value={formik.values.searchVal}
                />
                <button type="submit" className={s.big_search_img}>
                    <Image
                        src={'/assets/icons/search.svg'}
                        alt={'search'}
                        fill={true}
                    />
                </button>
            </form>
            <div className={s.categ_links}>
                <Link href={'#'}>{t('common:batteries')}</Link>
                <Link href={'#'}>{t('common:oil')}</Link>
                <Link href={'#'}>{t('common:tires')}</Link>
            </div>
        </div>
    );
};
