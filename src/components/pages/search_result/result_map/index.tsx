import { FC, useCallback, useEffect, useState } from 'react';

import { Map, Overlay } from 'pigeon-maps';
import s from './index.module.scss';

import { useTranslation } from 'next-i18next';

import { useRouter } from 'next/router';

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

import { ZoomControl } from 'components/ui/map/map_controls/zoom';
import { maptiler } from 'pigeon-maps/providers';
import { NoResult } from 'components/ui/no_result';
import { transformSelectOptions } from 'src/helpers/transformSelectOptions';
import { selectDefaultVal } from 'src/constants/ selectDefaultVal';
import { productsApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';

const maptilerProvider = maptiler('Qlx00jY8FseHxRsxC7Dn', 'dataviz-light');

const fakeAnchor = [
    [41.31240320650527, 69.27836058056674],
    [41.312801603213416, 69.28121824199522],
    [41.31578747810986, 69.2709021702546],
];

export const ResultMap: FC<{ staticPar: IStaticParams }> = ({ staticPar }): JSX.Element => {
    const { t } = useTranslation();

    const {
        pathname,
        push,
        query: { page },
        query,
    } = useRouter();

    const { openClose: mapIsOpen, handleOpenClose: setToggleMap } = useOpenCloseWithVal();
    const { openClose: OrderDetail, handleOpenClose: setOrderDetail } = useOpenCloseWithVal();
    const { openClose: isOpenFilter, handleOpenClose: setIsOpenFilter } = useOpenCloseWithVal();
    const { handleFilter } = useFilter();

    const handleBranchId = () => {};

    const handlePage = useCallback(
        (sign: string, limit: number) => async () => {
            let pageLoc = (page ?? 1) as number;

            if (sign === '+') pageLoc >= limit ? (pageLoc = limit) : pageLoc++;
            if (sign === '-') pageLoc <= 1 ? (pageLoc = 1) : pageLoc;

            await push({
                pathname: pathname,
                query: { ...query, page: pageLoc },
            });
        },
        [query]
    );

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        (async () => {
            await productsApi
                .getPartsNoGroup()
                .then((res) => {
                    setData(res);
                })
                .catch((err) => {
                    toast.error('Ошибка');
                });
        })();
    }, [query]);

    console.log(data);

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
                                <MapItem toggleBookDetail={setOrderDetail} amount={1} price={2} />
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
                    <div className={s.shadow}></div>
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
                        <InputSearch />
                        <div className={s.filter_for_respon}>
                            <button className={s.filter_btn}>{t('filter:price')}</button>
                            <button className={s.filter_btn}>{t('filter:howmany')}</button>
                            <FilterResponsive
                                btnText={'anotherFilter'}
                                isOpen={isOpenFilter}
                                toggleFilter={setIsOpenFilter}
                                data={staticPar as any}
                            />
                        </div>
                        <div className={s.filter_laptop}>
                            <FilterSelections>
                                {filterTitles['search'].map((item) => {
                                    return (
                                        <FilterSelect
                                            id={item}
                                            key={item}
                                            title={t(`common:selects.${item}`)}
                                            value={(query[item] ?? '') as string}
                                            fun={handleFilter}
                                            labelAlt={t('common:choose')}
                                            options={
                                                /*@ts-ignore*/
                                                staticPar ? transformSelectOptions(staticPar[item]) : selectDefaultVal
                                            }
                                        />
                                    );
                                })}
                            </FilterSelections>
                        </div>
                    </div>
                    {data && <ResultTableForm toggleBookDetail={setOrderDetail} data={data.data} />}

                    {/*<ResultTableFormResp toggleBookDetail={setOrderDetail} />*/}
                    <Pagination pageCount={5} />
                    {/*<NoResult />*/}
                </div>
            </Container>

            {OrderDetail && <BookDetail toggleBookDetail={setOrderDetail} />}
        </div>
    );
};
