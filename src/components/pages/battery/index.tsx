import s from './index.module.scss';

import { detailsTabs } from 'src/constants/detailsTabs';

import { Title } from 'components/ui/title';
import { SearchTabs } from 'components/ui/search/tabs';
import { InputSelectWrTabs } from 'components/ui/input/input_filter_wr_tabs';
import { useHandleActivetTabHome } from 'src/hooks/search_home/useHandleActivetTabHome';
import { useTranslation } from 'next-i18next';

import { FilterResponsive } from 'components/ui/filter/filter_responsive';
import { FilterSelections } from 'components/ui/filter/filter_selections';
import { filterTitles } from 'src/constants/filterTitles';
import { FilterSelect } from 'components/ui/filter/filter_selections/filter_select';
import { useOpenCloseWithVal } from 'src/hooks/common/useOpenCloseWithVal';
import { useFilter } from 'src/hooks/common/useFilter';
import { useFilterTabs } from 'src/hooks/common/useFilterTabs';
import { useRouter } from 'next/router';

export const Battery = (): JSX.Element => {
    const { activeTab, handleActivetab } = useHandleActivetTabHome();
    const { handleOpenClose, openClose } = useOpenCloseWithVal();
    const { handleFilter } = useFilter();
    const { filterData } = useFilterTabs(1);
    const { t } = useTranslation();
    const { query } = useRouter();

    return (
        <>
            <Title main className={s.title}>
                {t('common:batteryCat')}
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
                            tabsRes={detailsTabs}
                            tabs={detailsTabs}
                            className={s.tabs_wr_out}
                        >
                            <InputSelectWrTabs>
                                <FilterSelections>
                                    {filterTitles['battery'].map((item) => {
                                        return (
                                            <FilterSelect
                                                id={item}
                                                key={item}
                                                title={t(`filter:${item}`)}
                                                value={
                                                    (query[item] ??
                                                        '') as string
                                                }
                                                fun={handleFilter}
                                                labelAlt={
                                                    filterData[item][0]?.label
                                                }
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
        </>
    );
};
