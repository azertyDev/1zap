import { FC, useCallback, useState } from 'react';

import { Map, Marker, Overlay } from 'pigeon-maps';
import s from './index.module.scss';

import { useTranslation } from 'next-i18next';

import { useRouter } from 'next/router';
import { useFormik } from 'formik';

import { FilterSelections } from 'components/ui/filter/filter_selections';
import { FilterSelect } from 'components/ui/filter/filter_selections/filter_select';
import { Container } from 'components/ui/container';
import { FilterResponsive } from 'components/ui/filter/filter_responsive';
import { ResultTableForm } from 'components/pages/search_result/result_table_form';
import { MapItem } from 'components/pages/search_result/serch_items/map_item';
import { ToggleButton } from 'components/pages/search_result/serch_items/toggle_button';
import { InputSearch } from 'components/pages/search_result/serch_items/input_search';
import { ToggleResize } from 'components/pages/search_result/serch_items/toggle_resize';
import { ResultTableFormResp } from 'components/pages/search_result/result_table_form_resp';
import { BookDetail } from 'components/pages/search_result/book_detail';
import { useOpenCloseWithVal } from 'src/hooks/common/useOpenCloseWithVal';
import { Pagination } from 'components/ui/pagination/Pagination';
import { useFilter } from 'src/hooks/common/useFilter';
import { filterTitles } from 'src/constants/filterTitles';
import { useGetFilterValues } from 'src/hooks/useGetFilterValues';

import { ZoomControl } from 'components/ui/map/map_controls/zoom';
import { maptiler } from 'pigeon-maps/providers';
import { NoResult } from 'components/ui/no_result';

const maptilerProvider = maptiler('Qlx00jY8FseHxRsxC7Dn', 'dataviz-light');

const fakeAnchor = [
    [41.31240320650527, 69.27836058056674],
    [41.312801603213416, 69.28121824199522],
    [41.31578747810986, 69.2709021702546],
];

export const ResultMap: FC = (): JSX.Element => {
    const { t } = useTranslation();

    const {
        pathname,
        push,
        query: { page },
    } = useRouter();

    const { openClose: mapIsOpen, handleOpenClose: setToggleMap } = useOpenCloseWithVal();
    const { openClose: OrderDetail, handleOpenClose: setOrderDetail } = useOpenCloseWithVal();
    const { openClose: isOpenFilter, handleOpenClose: setIsOpenFilter } = useOpenCloseWithVal();

    const { handleFilter } = useFilter();
    const { searchValue } = useGetFilterValues();

    const { query } = useRouter();

    const formik = useFormik({
        initialValues: {
            searchVal: '',
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const handlePage = useCallback(
        (sign: string, limit: number) => async () => {
            let a = (page ?? 1) as number;

            if (sign === '+') a >= limit ? (a = limit) : a++;
            if (sign === '-') a <= 1 ? (a = 1) : a--;

            await push({
                pathname: pathname,
                query: { ...query, page: a },
            });
        },
        [query]
    );

    return (
        <div>
            <div className={`${s.map} ${mapIsOpen ? s.active : ''}`}>
                <Map
                    provider={maptilerProvider}
                    dprs={[1, 2]}
                    defaultCenter={[41.31172327941058, 69.2818072781773]}
                    defaultZoom={15}
                    boxClassname={s.map}
                >
                    {fakeAnchor.map((item, index) => {
                        return (
                            <Overlay anchor={item as [number, number]} offset={[30, 30]} key={index}>
                                <MapItem amount={1} price={2} />
                            </Overlay>
                        );
                    })}

                    <ZoomControl
                        isClient
                        closeMap={setToggleMap}
                        pagination={handlePage}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '499px',
                            left: '0',
                            width: '100%',
                            zIndex: 2,
                        }}
                    />
                </Map>
            </div>

            <Container>
                <div className={`${s.search_wr} ${mapIsOpen ? s.active : ''}`}>
                    <ToggleButton mapIsOpen={mapIsOpen} fun={setToggleMap} />
                    <ToggleResize
                        mapIsOpen={mapIsOpen}
                        fun={setToggleMap as (val: boolean | ((prev: boolean) => boolean)) => () => void}
                    />

                    <div className={`${s.search} ${mapIsOpen ? s.notActive : ''}`}>
                        <InputSearch
                            valResert={formik.resetForm}
                            fun={formik.handleSubmit}
                            values={formik.getFieldProps('searchVal')}
                        />
                        <div className={s.filter_for_respon}>
                            <button className={s.filter_btn}>{t('filter:price')}</button>
                            <button className={s.filter_btn}>{t('filter:howmany')}</button>
                            <FilterResponsive
                                btnText={'anotherFilter'}
                                isOpen={isOpenFilter}
                                toggleFilter={setIsOpenFilter}
                                data={searchValue}
                            />
                        </div>
                        <div className={s.filter_laptop}>
                            <FilterSelections>
                                {filterTitles['search'].map((item) => {
                                    return (
                                        <FilterSelect
                                            id={item}
                                            key={item}
                                            title={t(`filter:${item}`)}
                                            value={(query[item] ?? '') as string}
                                            fun={handleFilter}
                                            labelAlt={searchValue[item][0].label}
                                            options={searchValue[item]}
                                        />
                                    );
                                })}
                            </FilterSelections>
                        </div>
                    </div>
                    <ResultTableForm toggleBookDetail={setOrderDetail} />
                    <ResultTableFormResp toggleBookDetail={setOrderDetail} />
                    <Pagination pageCount={5} />
                    {/*<NoResult />*/}
                </div>
            </Container>

            {OrderDetail && <BookDetail toggleBookDetail={setOrderDetail} />}
        </div>
    );
};
