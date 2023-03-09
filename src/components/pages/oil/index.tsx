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

export const Oil = (): JSX.Element => {
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
                            tabsRes={tabsValue.common}
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
                                                title={t(`filter:${item}`)}
                                                value={(query[item] ?? '') as string}
                                                fun={handleFilter}
                                                labelAlt={filterData[item][0]?.label}
                                                options={filterData[item]}
                                            />
                                        );
                                    })}
                                </FilterSelections>
                            </InputSelectWrTabs>
                        </SearchTabs>
                    </>
                )}
            </div>
            <div className={s.table}>
                <TableRow className={s.table_row}>
                    <TableElement className={'table_h'}>{t('filter:manufacturers')}</TableElement>
                    <TableElement className={'table_h'}>{t('filter:number')}</TableElement>
                    <TableElement className={'table_h'}>{t('filter:photo')}</TableElement>
                    <TableElement className={'table_h'}>{t('filter:nameProduct')}</TableElement>
                    <TableElement className={'table_h'}>{t('filter:typeAndStick')}</TableElement>
                    <TableElement className={'table_h'}>{t('filter:middlePrice')}</TableElement>
                    <TableElement className={'table_h'}>{t('filter:offer')}</TableElement>
                </TableRow>
                <TableRow className={s.table_row}>
                    <TableElement className={'table_b'}>
                        <h5>GM</h5>
                    </TableElement>
                    <TableElement className={'table_b'}>
                        <h5>31232131</h5>
                    </TableElement>
                    <TableElement className={'table_b'}>
                        <Image
                            src={
                                'https://images.unsplash.com/photo-1676296825236-8c06ac83938b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80'
                            }
                            alt={'oil'}
                            width={52}
                            height={70}
                        />
                    </TableElement>
                    <TableElement className={'table_b'}>
                        <h5>POLYMERIUM XPRO1 5W30 C3 DEXOS2 4L</h5>
                    </TableElement>
                    <TableElement className={'table_b'}>
                        <h5>5W-30</h5>
                        <p>Синтетическое 5л</p>
                    </TableElement>
                    <TableElement className={'table_b'}>
                        <h5>$19</h5>
                        <p>от 15$ до 23$</p>
                    </TableElement>
                    <TableElement className={'table_b'}>
                        <button>{t('common:show')} - 44</button>
                    </TableElement>
                </TableRow>
            </div>

            <ResponsTable />
            <ResponsTable />
            <ResponsTable />
            <Pagination pageCount={12} />
        </>
    );
};
