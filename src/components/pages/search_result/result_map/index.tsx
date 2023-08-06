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
import { Icon } from 'components/ui/icon';
import { useStore } from 'src/store/useStore';
import { IProduct, IStaticParams } from 'types';
import { getFilterParamsResultPage } from 'src/helpers/getFilterParamsResultPage';

const maptilerProvider = maptiler('Qlx00jY8FseHxRsxC7Dn', 'dataviz-light');

export const ResultMap: FC<{ staticPar: IStaticParams }> = ({ staticPar }): JSX.Element => {
    const { t } = useTranslation();
    const {
        pathname,
        push,
        locale,
        query: {
            page,
            filter,
            oem,
            payment,
            delivery,
            service,
            client,
            shipment,
            updates,
            isOrigin,
            price,
            availability,
        },
        query,
    } = useRouter();

    const { openClose: mapIsOpen, handleOpenClose: setToggleMap } = useOpenCloseWithVal();
    const { openClose: isOpenFilter, handleOpenClose: setIsOpenFilter } = useOpenCloseWithVal();
    const { handleFilter } = useFilter();
    const { currency } = useStore((state) => state);

    const [data, setData] = useState<{ data: IProduct[]; totalPages: number } | null>(null);

    useEffect(() => {
        (async () => {
            await productsApi
                // @ts-ignore
                .getProductsNoGroup(
                    `page=${page ?? 1}&lang=${locale}${filter ? `&filter=${filter}` : ''}${
                        oem ? `&oem=${oem}` : ''
                    }${getFilterParamsResultPage(
                        payment as string,
                        delivery as string,
                        service as string,
                        client as string,
                        shipment as string,
                        updates as string,
                        isOrigin as string,
                        price as string,
                        availability as string
                    )}`
                )
                .then((res) => setData(res))
                .catch((err) => toast.error(t('helpers:error_getting')));
        })();
    }, [query]);

    const handlePage = useCallback(
        (sign: string) => async () => {
            let pageLoc = (page ?? 1) as number;

            if (data) {
                if (sign === '+') pageLoc >= data.totalPages ? (pageLoc = data.totalPages) : pageLoc++;
                if (sign === '-') pageLoc <= 1 ? (pageLoc = 1) : pageLoc--;
            }

            await push({
                pathname: pathname,
                query: { ...query, page: pageLoc },
            });
        },
        [query]
    );

    const sortByPriceAndAval = useCallback(
        (filterBy: string, filterText: string, removeFilter: string) => {
            return () => {
                const by = filterBy ? (filterBy === 'asc' ? 'desc' : 'asc') : 'desc';
                push(
                    {
                        pathname: pathname,
                        query: { ...query, [filterText]: by, [removeFilter]: '' },
                    },
                    undefined,
                    { scroll: false }
                );
            };
        },
        [query]
    );

    return (
        <div>
            <div
                className={`${s.map} ${mapIsOpen ? s.active : ''} ${data && data.data.length === 0 ? s.hide_map : ''}`}
            >
                {data && (
                    <Map
                        provider={maptilerProvider}
                        dprs={[1, 2]}
                        defaultCenter={JSON.parse(
                            data.data.map((item) => item.location)[0]?.coordination ??
                                '[41.31172327941058, 69.2818072781773]'
                        )}
                        defaultZoom={15}
                        boxClassname={s.map}
                    >
                        {data &&
                            data.data
                                .map((item) => item.location)
                                .map((item, index) => {
                                    return (
                                        <Overlay anchor={JSON.parse(item.coordination)} offset={[30, 30]} key={index}>
                                            <MapItem
                                                amount={item.availability}
                                                price={{
                                                    sum: item.sum,
                                                    usd: item.usd,
                                                }}
                                                branchId={item.branchId}
                                                productId={item.productId}
                                                providerId={item.providerId}
                                            />
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
                )}
            </div>

            <Container>
                <div
                    className={`${s.search_wr} ${mapIsOpen ? s.active : ''} ${
                        data && data.data.length === 0 ? s.hide_map : ''
                    }`}
                >
                    <ToggleButton mapIsOpen={mapIsOpen} fun={setToggleMap} />
                    <div className={data && data.data.length === 0 ? s.hide_map_resize : ''}>
                        <ToggleResize
                            mapIsOpen={mapIsOpen}
                            fun={setToggleMap as (val: boolean | ((prev: boolean) => boolean)) => () => void}
                        />
                    </div>

                    <div className={`${s.search} ${mapIsOpen ? s.notActive : ''}`}>
                        <InputSearch />
                        <div className={s.filter_for_respon}>
                            <button
                                className={s.filter_btn}
                                onClick={sortByPriceAndAval(price as string, 'price', 'availability')}
                            >
                                <p> {t('common:selects:price')}</p>
                                <span className={s.filter_price_buttons}>
                                    <span>
                                        <Icon name={'expand_less'} size={16} color={'#9A9EA7'} />
                                    </span>
                                    <span>
                                        <Icon name={'expand_more'} size={16} color={'#9A9EA7'} />
                                    </span>
                                </span>
                            </button>
                            <button
                                className={s.filter_btn}
                                onClick={sortByPriceAndAval(availability as string, 'availability', 'price')}
                            >
                                <p>{t('common:selects:howmany')}</p>
                                <span className={s.filter_price_buttons}>
                                    <span>
                                        <Icon name={'expand_less'} size={16} color={'#9A9EA7'} />
                                    </span>
                                    <span>
                                        <Icon name={'expand_more'} size={16} color={'#9A9EA7'} />
                                    </span>
                                </span>
                            </button>
                            <div>
                                <FilterResponsive
                                    btnText={'anotherFilter'}
                                    isOpen={isOpenFilter}
                                    toggleFilter={setIsOpenFilter}
                                    data={staticPar as any}
                                    isTranslated
                                />
                            </div>
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
                                                staticPar /*@ts-ignore*/
                                                    ? transformSelectOptions(staticPar[item]).map((item) => ({
                                                          value: item.value,
                                                          label: item.label.toUpperCase(),
                                                      }))
                                                    : selectDefaultVal
                                            }
                                        />
                                    );
                                })}
                            </FilterSelections>
                        </div>
                    </div>
                    {data && data.data.length > 0 && (
                        <ResultTableForm sortByPrice={sortByPriceAndAval} data={data.data} />
                    )}
                    {data && data.data.length > 0 && <ResultTableFormResp data={data.data} />}

                    {data && data.data.length > 0 && <Pagination pageCount={data.totalPages} />}
                    {data && data.data.length === 0 && <NoResult />}
                </div>
            </Container>

            <BookDetail />
        </div>
    );
};
