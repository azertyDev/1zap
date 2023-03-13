import { FC, useState } from 'react';

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
import { Icon } from 'components/ui/icon';
const maptilerProvider = maptiler('Qlx00jY8FseHxRsxC7Dn', 'dataviz-light');

const fakeAnchor = [
    [41.31240320650527, 69.27836058056674],
    [41.312801603213416, 69.28121824199522],
    [41.31578747810986, 69.2709021702546],
];

export const ResultMap: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const [mapIsOpen, setIsOpen] = useState(false);

    const { openClose, handleOpenClose } = useOpenCloseWithVal();
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

    return (
        <div>
            <div className={`${s.map} ${mapIsOpen ? s.active : ''}`}>
                <Map
                    provider={maptilerProvider}
                    dprs={[1, 2]}
                    defaultCenter={[41.31172327941058, 69.2818072781773]}
                    defaultZoom={15}
                    // metaWheelZoom
                    boxClassname={s.map}
                >
                    {fakeAnchor.map((item, index) => {
                        return (
                            <Overlay anchor={item as [number, number]} offset={[30, 30]} key={index}>
                                <MapItem amount={1} price={2} />
                            </Overlay>
                        );
                    })}
                    <ZoomControl />
                    <div className={s.shadow}></div>
                </Map>
            </div>

            <Container>
                <div className={`${s.search_wr} ${mapIsOpen ? s.active : ''}`}>
                    <ToggleButton mapIsOpen={mapIsOpen} fun={setIsOpen} />
                    <ToggleResize mapIsOpen={mapIsOpen} fun={setIsOpen} />

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
                    <ResultTableForm toggleBookDetail={handleOpenClose} />
                    <ResultTableFormResp toggleBookDetail={handleOpenClose} />
                    <Pagination pageCount={5} />
                    {/*<NoResult />*/}
                </div>
            </Container>

            {openClose && <BookDetail toggleBookDetail={handleOpenClose} />}
        </div>
    );
};
