import { FC, useEffect, useState } from 'react';

import s from './index.module.scss';

import { useTranslation } from 'next-i18next';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { usePreviewSearchResult } from 'src/hooks/search_home/usePreviewSearchResult';

export const SearchCategory: FC<{ className: (val: boolean) => string }> = ({
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

    const { searchRes } = usePreviewSearchResult(
        formik.values.searchVal,
        formik
    );

    return (
        <>
            <div className={className(searchRes)}>
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
        </>
    );
};
