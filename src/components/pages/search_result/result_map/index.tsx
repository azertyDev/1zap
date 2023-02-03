import React, { FC, useRef, useState } from 'react';

import { Map, Overlay } from 'pigeon-maps';
import s from './index.module.scss';
import Image from 'next/image';

import { useTranslation } from 'next-i18next';

import { useRouter } from 'next/router';
import { useFormik } from 'formik';

import { FilterSelections } from 'components/ui/filter_selections';
import { FilterSelect } from 'components/ui/filter_selections/filter_select';
import { Container } from 'components/ui/container';
import { FilterResponsive } from 'components/ui/filter_responsive';
import { NoResult } from 'components/pages/search_result/no_result';
import { ResultTableForm } from 'components/pages/search_result/result_table_form';
import { MapItem } from 'components/pages/search_result/serch_items/map_item';
import { ToggleButton } from 'components/pages/search_result/serch_items/toggle_button';
import { InputSearch } from 'components/pages/search_result/serch_items/input_search';
import { ToggleResize } from 'components/pages/search_result/serch_items/toggle_resize';
import { ResultTableFormResp } from 'components/pages/search_result/result_table_form_resp';
import { BookDetail } from 'components/pages/search_result/book_detail';
import { useOpenCloseWithVal } from 'src/hooks/common/useOpenCloseWithVal';

const fakeAnchor = [
    [41.31240320650527, 69.27836058056674],
    [41.312801603213416, 69.28121824199522],
    [41.31578747810986, 69.2709021702546],
];

export const ResultMap: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const [mapIsOpen, setIsOpen] = useState(false);
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const { openClose, handleOpenClose } = useOpenCloseWithVal();

    const {
        query: {
            payment,
            delivery,
            services,
            supply,
            producer,
            condition,
            updates,
        },
        push,
        pathname,
        query,
    } = useRouter();

    const formik = useFormik({
        initialValues: {
            searchVal: '',
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const handleFilter = (key: string) => {
        return (ev: any) => {
            push({
                pathname: pathname,
                query: {
                    ...query,
                    page: 1,
                    [key]: ev.value,
                },
            });
        };
    };

    return (
        <div className={s.map_wr}>
            <div className={`${s.map} ${mapIsOpen ? s.active : ''}`}>
                <Map
                    defaultCenter={[41.31300484525912, 69.27182341706133]}
                    defaultZoom={17}
                >
                    {fakeAnchor.map((item, index) => {
                        return (
                            <Overlay
                                anchor={item as [number, number]}
                                offset={[30, 30]}
                                key={index}
                            >
                                <MapItem amount={1} price={2} />
                            </Overlay>
                        );
                    })}
                    <div className={s.shadow}></div>
                </Map>
            </div>

            <Container>
                <div className={`${s.search_wr} ${mapIsOpen ? s.active : ''}`}>
                    <ToggleButton mapIsOpen={mapIsOpen} fun={setIsOpen} />

                    <ToggleResize mapIsOpen={mapIsOpen} fun={setIsOpen} />

                    <div
                        className={`${s.search} ${
                            mapIsOpen ? s.notActive : ''
                        }`}
                    >
                        <InputSearch
                            valResert={formik.resetForm}
                            fun={formik.handleSubmit}
                            values={formik.getFieldProps('searchVal')}
                        />
                        <div className={s.filter_for_respon}>
                            <button className={s.filter_btn}>Цена</button>
                            <button className={s.filter_btn}>Наличие</button>
                            <FilterResponsive
                                btnText={'anotherFilter'}
                                isOpen={isOpenFilter}
                                fun={setIsOpenFilter}
                            />
                        </div>
                        <FilterSelections>
                            <FilterSelect
                                id={'payment'}
                                title={t('filter:payment')}
                                value={
                                    (payment ??
                                        'Aaaaaaaaaaaaaaaaaaaa') as string
                                }
                                fun={handleFilter}
                                labelAlt={'Aaaaaaaaaaaaaaaaaaaa'}
                                options={[
                                    {
                                        value: 'Aaaaaaaaaaaaaaaaaaaa',
                                        label: 'Aaaaaaaaaaaaaaaaaaaa',
                                    },
                                    { value: 'b', label: 'b' },
                                ]}
                            />
                            <FilterSelect
                                id={'delivery'}
                                title={t('filter:delivery')}
                                value={(delivery ?? 'a') as string}
                                fun={handleFilter}
                                labelAlt={'a'}
                                options={[
                                    { value: 'a', label: 'a' },
                                    { value: 'b', label: 'b' },
                                ]}
                            />
                            <FilterSelect
                                id={'services'}
                                title={t('filter:services')}
                                value={(services ?? 'a') as string}
                                fun={handleFilter}
                                labelAlt={'a'}
                                options={[
                                    { value: 'a', label: 'a' },
                                    { value: 'b', label: 'b' },
                                ]}
                            />

                            <FilterSelect
                                id={'supply'}
                                title={t('filter:supply')}
                                value={(supply ?? 'a') as string}
                                fun={handleFilter}
                                labelAlt={'a'}
                                options={[
                                    { value: 'a', label: 'a' },
                                    { value: 'b', label: 'b' },
                                ]}
                            />
                            <FilterSelect
                                id={'producer'}
                                title={t('filter:producer')}
                                value={(producer ?? 'a') as string}
                                fun={handleFilter}
                                labelAlt={'a'}
                                options={[
                                    { value: 'a', label: 'a' },
                                    { value: 'b', label: 'b' },
                                ]}
                            />

                            <FilterSelect
                                id={'condition'}
                                title={t('filter:condition')}
                                value={(condition ?? 'a') as string}
                                fun={handleFilter}
                                labelAlt={'a'}
                                options={[
                                    { value: 'a', label: 'a' },
                                    { value: 'b', label: 'b' },
                                ]}
                            />
                            <FilterSelect
                                id={'updates'}
                                title={t('filter:updates')}
                                value={(updates ?? 'a') as string}
                                fun={handleFilter}
                                labelAlt={'a'}
                                options={[
                                    { value: 'a', label: 'a' },
                                    { value: 'b', label: 'b' },
                                ]}
                            />
                        </FilterSelections>
                    </div>
                    <ResultTableForm fun={handleOpenClose} />
                    <ResultTableFormResp fun={handleOpenClose} />
                    {/*<NoResult />*/}
                </div>
            </Container>

            {openClose && (
                <BookDetail
                    fun={handleOpenClose}
                    handleOpen={handleOpenClose}
                />
            )}
        </div>
    );
};
