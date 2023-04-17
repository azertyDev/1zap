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
import { useRouter } from 'next/router';
import { useFindVehicleByWizard } from 'src/hooks/laximoData/useFindVehicleByWizard';
import { NoResult } from 'components/ui/no_result';

export const Details: FC<{
    dataFind: string;
    dataCatalog: string;
    dataFilterFirstLevel: string;
    dataYear: string;
    dataResultVehicle: string;
}> = ({ dataFind, dataCatalog, dataFilterFirstLevel, dataYear, dataResultVehicle }): JSX.Element => {
    const { handleActivetab } = useHandleActivetTabHome();

    const {
        query: { tab },
    } = useRouter();

    const { dataFindV } = useFindVin(dataFind);
    const { dataVehicle } = useFindVehicleByWizard(dataResultVehicle);

    const { t } = useTranslation();

    console.log(dataFindV);
    return (
        <PageWrapper>
            <Container>
                <Title main className={s.title}>
                    {t('common:sparePartsCat')}
                </Title>

                <div className={s.tabs_wr}>
                    <SearchTabs activeTab={+tab!} handleTab={handleActivetab} tabs={tabsValue.datails}>
                        <InputSelectWrTabs>
                            {+tab! === 1 && <FitParams />}
                            {+tab! === 2 && (
                                <FitCars
                                    dataCatalog={dataCatalog}
                                    dataFilterFirstLevel={dataFilterFirstLevel}
                                    dataYear={dataYear}
                                />
                            )}
                        </InputSelectWrTabs>
                    </SearchTabs>
                </div>

                <div className={s.table}>
                    {((dataFindV && dataFindV.length > 0) || dataVehicle) && (
                        <>
                            <TableRow className={s.table_row}>
                                <TableElement className={'table_h'}>{t('common:selects.brand')}</TableElement>
                                <TableElement className={'table_h'}>{t('common:selects.modelMeaning')}</TableElement>
                                <TableElement className={'table_h'}>{t('common:selects.year')}</TableElement>
                                <TableElement className={'table_h'}>{t('common:selects.region')}</TableElement>
                                <TableElement className={'table_h'}></TableElement>
                            </TableRow>
                        </>
                    )}
                    {dataFindV && dataFindV.length === 0 && <NoResult />}
                    {(dataFindV || dataVehicle) &&
                        (dataFindV! || dataVehicle!).map(({ $, attribute }) => {
                            return (
                                <div key={$.name + $.ssd}>
                                    <TableRow className={s.table_row}>
                                        <TableElement className={`table_b`}>
                                            <h5>{$.brand}</h5>
                                        </TableElement>
                                        <TableElement className={'table_b'}>
                                            <h5>{$.name}</h5>
                                        </TableElement>
                                        <TableElement className={'table_b'}>
                                            {attribute.map(({ $ }) => {
                                                return $.key === 'date' ||
                                                    $.key === 'production_date' ||
                                                    $.key === 'model_year' ? (
                                                    <h5 key={$.key}>{$.value}</h5>
                                                ) : null;
                                            })}
                                        </TableElement>
                                        <TableElement className={'table_b'}>
                                            {attribute.map(({ $ }) => {
                                                return $.key === 'market' || $.key === 'region' ? (
                                                    <h5 key={$.key}>{$.value}</h5>
                                                ) : null;
                                            })}
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
