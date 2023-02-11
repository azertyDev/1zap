import { FC, useEffect, useState } from 'react';
import s from './index.module.scss';

import { useTranslation } from 'next-i18next';
import { useFormik } from 'formik';

import Image from 'next/image';
import { SearchResultPreview } from 'components/ui/search/result_preview';
import { usePreviewSearchResult } from 'src/hooks/search_home/usePreviewSearchResult';
import { Icon } from 'components/ui/icon';

const fakeSearchResult = [
    {
        id: 1,
        title: 'PBA001',
        text: 'ФИЛЬТР МАСЛЯННЫЙ',
    },
    {
        id: 2,
        title: 'PBA001',
        text: 'Pba001 Speedmate SpeedMate арт. SMOFH006 Фильтр Масляный 2630035503 / Pba001 Speedmate',
    },

    {
        id: 3,
        title: 'SMOFH006',
        text: 'Фильтр масляный PMC PBA001',
    },
    {
        id: 4,
        title: 'ASINFL2472',
        text: 'Фильтр масляный ASIN 26300-35530 SOLARIS RB/HCR, JFM0007, PBA-001, PBA001, AMD.FL13, AMDFL13',
    },
];

export const SearchDetails: FC<{ className: (val: boolean) => string }> = ({
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
                    <button type="submit" className={s.big_search_img}>
                        <Icon size={25} name={'search'} color={'#fff'} />
                    </button>

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
            <SearchResultPreview
                searchRes={searchRes}
                data={fakeSearchResult}
            />
        </>
    );
};
