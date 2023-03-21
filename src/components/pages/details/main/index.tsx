import { FC, useEffect, useState } from 'react';

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

import { FitCars } from 'components/pages/details/main/fir_cars';
import { tabsValue } from 'src/constants/tabsValue';
import { FitParams } from 'components/pages/details/main/fit_params';
import { useFindVin } from 'src/hooks/laximoData/useFindVin';

export const Details: FC<{ dataFind: string; dataCatalog: string; dataWizard: string }> = ({
    dataFind,
    dataCatalog,
    dataWizard,
}): JSX.Element => {
    const { activeTab, handleActivetab } = useHandleActivetTabHome();
    const { dataFindV } = useFindVin(dataFind);

    const { t } = useTranslation();

    return (
        <PageWrapper>
            <Container>
                <Title main className={s.title}>
                    {t('common:sparePartsCat')}
                </Title>

                <div className={s.tabs_wr}>
                    <SearchTabs activeTab={activeTab} handleTab={handleActivetab} tabs={tabsValue.datails}>
                        <InputSelectWrTabs>
                            {activeTab === 1 && <FitParams />}
                            {activeTab === 2 && <FitCars dataCatalog={dataCatalog} dataWizard={dataWizard} />}
                        </InputSelectWrTabs>
                    </SearchTabs>
                </div>

                <div className={s.table}>
                    {dataFindV &&
                        dataFindV.map(({ $, attribute }) => {
                            return (
                                <div key={$.name}>
                                    <TableRow className={s.table_row}>
                                        <TableElement className={'table_h'}>{t('filter:brand')}</TableElement>
                                        <TableElement className={'table_h'}>{t('filter:modelMeaning')}</TableElement>
                                        <TableElement className={'table_h'}>{t('filter:year')}</TableElement>
                                        <TableElement className={'table_h'}>{t('filter:region')}</TableElement>
                                        <TableElement className={'table_h'}></TableElement>
                                    </TableRow>
                                    <TableRow className={s.table_row}>
                                        <TableElement className={'table_b'}>
                                            <h5>{$.brand}</h5>
                                        </TableElement>
                                        <TableElement className={'table_b'}>
                                            <h5>{$.name}</h5>
                                        </TableElement>
                                        <TableElement className={'table_b'}>
                                            {attribute.map(({ $ }) => {
                                                return $.key === 'date' || $.key === 'production_date' ? (
                                                    <h5 key={$.key}>{$.value}</h5>
                                                ) : null;
                                            })}
                                        </TableElement>
                                        <TableElement className={'table_b'}>
                                            <h5>Прочий регион</h5>
                                        </TableElement>
                                        <TableElement className={'table_b'}>
                                            <Link
                                                href={`/details/categories?Catalog=${$.catalog}&Vid=${$.vehicleid}&sd=${$.ssd}`}
                                            >
                                                <button>{t('common:open')}</button>
                                            </Link>
                                        </TableElement>
                                    </TableRow>
                                </div>
                            );
                        })}
                </div>
            </Container>
        </PageWrapper>
    );
};
