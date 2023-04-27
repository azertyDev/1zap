import s from './index.module.scss';

import { Title } from 'components/ui/title';
import { SearchTabs } from 'components/ui/search/tabs';
import { InputSelectWrTabs } from 'components/ui/input/input_filter_wr_tabs';
import { useHandleActivetTabHome } from 'src/hooks/search_home/useHandleActivetTabHome';
import { useTranslation } from 'next-i18next';
import { FilterSelect } from 'components/ui/filter/filter_selections/filter_select';
import { FilterSelections } from 'components/ui/filter/filter_selections';

import { useRouter } from 'next/router';
import { TableRow } from 'components/ui/table/table_row';
import { TableElement } from 'components/ui/table/table_element';
import Image from 'next/image';

import { Pagination } from 'components/ui/pagination/Pagination';
import { useFilter } from 'src/hooks/common/useFilter';
import { useFilterTabs } from 'src/hooks/common/useFilterTabs';
import { ResponsTable } from 'components/ui/table/respons_table';
import { FilterResponsive } from 'components/ui/filter/filter_responsive';
import { useOpenCloseWithVal } from 'src/hooks/common/useOpenCloseWithVal';
import { filterTitles } from 'src/constants/filterTitles';
import { tabsValue } from 'src/constants/tabsValue';
import { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/ui/icon';

export const Oil: FC<{ data: { data: IProductGroup[]; totalPages: number } }> = ({ data }): JSX.Element => {
    const { activeTab, handleActivetab } = useHandleActivetTabHome();
    const { handleOpenClose, openClose } = useOpenCloseWithVal();
    const { handleFilter } = useFilter();
    const { filterData } = useFilterTabs(2);
    const { t } = useTranslation();

    const { query } = useRouter();

    return (
        <>
            <Title main className={s.title}>
                {t('common:oilCat')}
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
                                    {filterTitles['oil'].map((item) => {
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
            {data && data.totalPages !== 0 && (
                <>
                    <div className={s.table}>
                        <TableRow className={s.table_row}>
                            <TableElement className={'table_h'}>{t('common:selects.manufacturers')}</TableElement>
                            <TableElement className={'table_h'}>{t('common:selects.number')}</TableElement>
                            <TableElement className={'table_h'}>{t('common:selects.photo')}</TableElement>
                            <TableElement className={'table_h'}>{t('common:selects.typeAndStick')}</TableElement>
                            <TableElement className={'table_h'}>
                                <div className={s.filter_price_wr}>
                                    <div className={s.filter_price_buttons}>
                                        <div onClick={() => alert(1)}>
                                            <Icon name={'expand_less'} size={18} color={'#9A9EA7'} />
                                        </div>
                                        <div onClick={() => alert(2)}>
                                            <Icon name={'expand_more'} size={18} color={'#9A9EA7'} />
                                        </div>
                                    </div>
                                    <p> {t('common:selects.middlePrice')}</p>
                                </div>
                            </TableElement>
                            <TableElement className={'table_h'}>{t('common:selects.offer')}</TableElement>
                        </TableRow>
                        {data.data.map((item) => {
                            return (
                                <TableRow className={s.table_row} key={item.id}>
                                    <TableElement className={'table_b'}>
                                        <h5>{item.manufacturer}</h5>
                                    </TableElement>
                                    <TableElement className={'table_b'}>
                                        <h5>{item.uniqNumber}</h5>
                                    </TableElement>
                                    <TableElement className={'table_b'}>
                                        <Image src={'/assets/images/oil.png'} alt={'oil'} width={52} height={70} />
                                    </TableElement>

                                    <TableElement className={'table_b'}>
                                        <h5>{item.property}</h5>
                                    </TableElement>
                                    <TableElement className={'table_b'}>
                                        <h5>{item.average}</h5>
                                        <p>{t('common:fromTo', { from: item.priceFrom, to: item.priceTo })}</p>
                                    </TableElement>
                                    <TableElement className={'table_b'}>
                                        <Link href={`/search_result?id=${item.uniqNumber}`}>
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
            {data && data.totalPages !== 0 && (
                <div className={s.res_table_wr}>
                    {data.data.map((item) => {
                        return <ResponsTable item={item} key={item.id} />;
                    })}
                </div>
            )}

            {data && <Pagination pageCount={data.totalPages} />}
        </>
    );
};
