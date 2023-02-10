import {FC, useCallback} from 'react';
import {useHandleActivetTabHome} from 'src/hooks/search_home/useHandleActivetTabHome';

import {useTranslation} from 'next-i18next';
import {SearchTabs} from 'components/ui/search_tabs';

import {detailsTabs, detailsTabsRes} from 'src/constants/detailsTabs';

import {InputSelectWrTabs} from 'components/ui/input_filter_wr_tabs';
import {FitParams} from 'components/pages/details/main/fit_params';

import s from './index.module.scss';
import {Container} from 'components/ui/container';
import {Title} from "components/ui/title";
import {FirCars} from "components/pages/details/main/fir_cars";

export const Details: FC = (): JSX.Element => {
    const {activeTab, handleActivetab} = useHandleActivetTabHome();

    const {t} = useTranslation();

    return (
        <div className={s.details}>


            <Container>
                <Title main className={s.title}>
                    {t("common:sparePartsCat")}
                </Title>

                <div className={s.tabs_wr}>
                    <SearchTabs
                        activeTab={activeTab}
                        handleTab={handleActivetab}
                        tabsRes={detailsTabsRes}
                        tabs={detailsTabs}
                    >


                        <InputSelectWrTabs>
                            {activeTab === 1 && (<FitParams/>)}
                            {activeTab === 2 && (<FirCars/>)}
                        </InputSelectWrTabs>
                    </SearchTabs>
                </div>

            </Container>
        </div>
    );
};
