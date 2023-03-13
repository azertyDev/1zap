import { FC } from 'react';

import { useTranslation } from 'next-i18next';

import { useHandleActivetTabHome } from 'src/hooks/search_home/useHandleActivetTabHome';

import s from './index.module.scss';

import { SearchTabs } from 'components/ui/search/tabs';
import { InputSelectWrTabs } from 'components/ui/input/input_filter_wr_tabs';

import { Container } from 'components/ui/container';
import { Title } from 'components/ui/title';

import { TableRow } from 'components/ui/table/table_row';
import { TableElement } from 'components/ui/table/table_element';
import { PageWrapper } from 'components/ui/page_wrapper';

import Link from 'next/link';
// import { FitParams } from 'components/pages/tires/fit_params';
import { FitCars } from 'components/pages/details/main/fir_cars';
import { tabsValue } from 'src/constants/tabsValue';
import { FitParams } from 'components/pages/details/main/fit_params';

export const Details: FC = (): JSX.Element => {
    const { activeTab, handleActivetab } = useHandleActivetTabHome();

    const { t } = useTranslation();

    return (
        <PageWrapper>
            <Container>
                <Title main className={s.title}>
                    {t('common:sparePartsCat')}
                </Title>

                <div className={s.tabs_wr}>
                    <SearchTabs
                        activeTab={activeTab}
                        handleTab={handleActivetab}
                        tabsRes={tabsValue.datails}
                        tabs={tabsValue.datails}
                    >
                        <InputSelectWrTabs>
                            {activeTab === 1 && <FitParams />}
                            {activeTab === 2 && <FitCars />}
                        </InputSelectWrTabs>
                    </SearchTabs>
                </div>

                <div className={s.table}>
                    <TableRow className={s.table_row}>
                        <TableElement className={'table_h'}>{t('filter:brand')}</TableElement>
                        <TableElement className={'table_h'}>{t('filter:modelMeaning')}</TableElement>
                        <TableElement className={'table_h'}>{t('filter:year')}</TableElement>
                        <TableElement className={'table_h'}>{t('filter:region')}</TableElement>
                        <TableElement className={'table_h'}></TableElement>
                    </TableRow>
                    <TableRow className={s.table_row}>
                        <TableElement className={'table_b'}>
                            <h5> Chevrolet</h5>
                        </TableElement>
                        <TableElement className={'table_b'}>
                            <h5> GENTRA (T255) (2006 - 2011)</h5>
                        </TableElement>
                        <TableElement className={'table_b'}>
                            <h5>2009</h5>
                        </TableElement>
                        <TableElement className={'table_b'}>
                            <h5>Прочий регион</h5>
                        </TableElement>
                        <TableElement className={'table_b'}>
                            <Link href={'/details/categories'}>
                                <button>{t('common:open')}</button>
                            </Link>
                        </TableElement>
                    </TableRow>
                </div>
            </Container>
        </PageWrapper>
    );
};
