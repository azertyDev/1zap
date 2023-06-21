import s from './index.module.scss';

import { Title } from 'components/ui/title';
import { SearchTabs } from 'components/ui/search/tabs';
import { InputSelectWrTabs } from 'components/ui/input/input_filter_wr_tabs';
import { useHandleActivetTabHome } from 'src/hooks/search_home/useHandleActivetTabHome';
import { useTranslation } from 'next-i18next';

import { FilterSelections } from 'components/ui/filter/filter_selections';

import { filterTitles } from 'src/constants/filterTitles';
import { FilterSelect } from 'components/ui/filter/filter_selections/filter_select';
import { useFilter } from 'src/hooks/common/useFilter';
import { useFilterTabs } from 'src/hooks/common/useFilterTabs';
import { useRouter } from 'next/router';
import { FilterResponsive } from 'components/ui/filter/filter_responsive';
import { useOpenCloseWithVal } from 'src/hooks/common/useOpenCloseWithVal';
import { tabsValue } from 'src/constants/tabsValue';
import { TableRow } from 'components/ui/table/table_row';
import { TableElement } from 'components/ui/table/table_element';
import Image from 'next/image';
import { ResponsTable } from 'components/ui/table/respons_table';
import { Pagination } from 'components/ui/pagination/Pagination';
import Link from 'next/link';
import { FC } from 'react';
import { Icon } from 'components/ui/icon';
import { IProductGroup } from 'types';
import { formatNumber } from 'src/helpers/formatNumber';
import { useStore } from 'src/store/useStore';
import { useFiltersAscDesc } from 'src/hooks/common/filtersAscDesc';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';

export const Tires: FC<{ data: { data: IProductGroup[]; totalPages: number } }> = ({ data }): JSX.Element => {
    const { activeTab, handleActivetab } = useHandleActivetTabHome();
    const { handleOpenClose, openClose } = useOpenCloseWithVal();
    const { handleFilter } = useFilter();
    const { filterData } = useFilterTabs(4);
    const { t } = useTranslation();
    const { query } = useRouter();

    const { currency } = useStore((state) => state);
    const { dataOut, handleAsc, handleDesc } = useFiltersAscDesc(data);
    return (
        <>
            <Title main className={s.title}>
                {t('common:tiresCat')}
            </Title>

            <div className={s.tabs_wr}>
                {filterData && (
                    <>
                        <FilterResponsive
                            btnText={'fitParams'}
                            isOpen={openClose}
                            toggleFilter={handleOpenClose}
                            data={filterData}
                        />
                        <SearchTabs
                            activeTab={activeTab}
                            handleTab={handleActivetab}
                            tabs={tabsValue.common}
                            className={s.tabs_wr_out}
                        >
                            <InputSelectWrTabs>
                                <FilterSelections>
                                    {filterTitles['tires'].map((item) => {
                                        return (
                                            <FilterSelect
                                                id={item}
                                                key={item}
                                                title={t(`common:selects.${item}`)}
                                                value={(query[item] ?? '') as string}
                                                fun={handleFilter}
                                                labelAlt={filterData[item][0]?.label}
                                                options={filterData[item].map((item) => ({
                                                    value: item.value,
                                                    label: item.label?.toUpperCase(),
                                                }))}
                                                isTranslated
                                            />
                                        );
                                    })}
                                </FilterSelections>
                            </InputSelectWrTabs>
                        </SearchTabs>
                    </>
                )}
            </div>
            {dataOut && dataOut.totalPages !== 0 && (
                <>
                    <div className={s.table}>
                        <TableRow className={s.table_row}>
                            <TableElement className={'table_h'}>{t('common:selects.manufacturers')}</TableElement>
                            <TableElement className={'table_h'}>{t('common:selects.number')}</TableElement>
                            <TableElement className={'table_h'}>{t('common:selects.photo')}</TableElement>
                            <TableElement className={'table_h'}>{t('common:selects.size')}</TableElement>
                            <TableElement className={'table_h'}>
                                <div className={s.filter_price_wr}>
                                    <div className={s.filter_price_buttons}>
                                        <div onClick={handleAsc(currency === 'uzs' ? 'sum' : 'usd')}>
                                            <Icon name={'expand_less'} size={18} color={'#9A9EA7'} />
                                        </div>
                                        <div onClick={handleDesc(currency === 'uzs' ? 'sum' : 'usd')}>
                                            <Icon name={'expand_more'} size={18} color={'#9A9EA7'} />
                                        </div>
                                    </div>
                                    <p> {t('common:selects.middlePrice')}</p>
                                </div>
                            </TableElement>
                            <TableElement className={'table_h'}>{t('common:selects.offer')}</TableElement>
                        </TableRow>
                        {dataOut.data.map((item) => {
                            return (
                                <TableRow className={s.table_row} key={item.id}>
                                    <TableElement className={'table_b'}>
                                        <h5>{item.manufacturer}</h5>
                                    </TableElement>
                                    <TableElement className={'table_b'}>
                                        <h5>{item.uniqNumber}</h5>
                                    </TableElement>
                                    <TableElement className={'table_b'}>
                                        <Image src={'/assets/images/tire.png'} alt={'tire'} width={52} height={70} />
                                    </TableElement>
                                    <TableElement className={'table_b'}>
                                        <h5>{item.property}</h5>
                                    </TableElement>
                                    <TableElement className={'table_b'}>
                                        <h5>
                                            {currency === 'usd'
                                                ? `$${item.usd.average}`
                                                : `${formatNumber(item.sum.average)} сум`}
                                        </h5>
                                        <p>
                                            {t('common:fromTo', {
                                                from:
                                                    currency === 'usd'
                                                        ? `$${item.usd.priceFrom}`
                                                        : `${formatNumber(item.sum.priceFrom)}`,
                                                to:
                                                    currency === 'usd'
                                                        ? `$${item.usd.priceTo}`
                                                        : `${formatNumber(item.sum.priceTo)}`,
                                            })}
                                        </p>
                                    </TableElement>
                                    <TableElement className={'table_b'}>
                                        <Link href={`/search_result?oem=${item.uniqNumber}`}>
                                            <button>
                                                {t('common:show')} - {item.availability}
                                            </button>
                                        </Link>
                                    </TableElement>
                                </TableRow>
                            );
                        })}
                    </div>
                </>
            )}

            {dataOut && dataOut.totalPages !== 0 && (
                <div className={s.res_table_wr}>
                    {dataOut.data.map((item) => {
                        return <ResponsTable item={item} key={item.id} img={'/assets/images/tire.png'} />;
                    })}
                </div>
            )}

            {dataOut && <Pagination pageCount={dataOut.totalPages} />}
        </>
    );
};
