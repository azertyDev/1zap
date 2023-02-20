import { FC } from 'react';

import s from './index.module.scss';

import { useTranslation } from 'next-i18next';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { usePreviewSearchResult } from 'src/hooks/search_home/usePreviewSearchResult';
import {Icon} from "components/ui/icon";

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
            <div className={s.categ_links_res}>
                <Link href={'#'}>{t('common:batteries')}</Link>
                <Link href={'#'}>{t('common:oil')}</Link>
                <Link href={'#'}>{t('common:tires')}</Link>
            </div>
            <div className={className(searchRes)}>
                <form className={s.form} onSubmit={formik.handleSubmit}>
                    <input
                        {...formik.getFieldProps('searchVal')}
                        type="text"
                        className={`${s.input} ${s.input_categ}`}
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
