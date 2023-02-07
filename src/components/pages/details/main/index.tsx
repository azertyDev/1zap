import { FC, useCallback } from 'react';
import { useHandleActivetTabHome } from 'src/hooks/search_home/useHandleActivetTabHome';

import { useTranslation } from 'next-i18next';
import { SearchTabs } from 'components/ui/search_tabs';

import { detailsTabs, detailsTabsRes } from 'src/constants/detailsTabs';

import { InputSelectWrTabs } from 'components/ui/input_filter_wr_tabs';
import { FitParams } from 'components/pages/details/main/fit_params';

import s from './index.module.scss';
import { Container } from 'components/ui/container';

export const Details: FC = (): JSX.Element => {
    const { activeTab, handleActivetab } = useHandleActivetTabHome();

    const { t } = useTranslation();

    return (
        <div className={s.details}>
            <Container>
                <SearchTabs
                    activeTab={activeTab}
                    handleTab={handleActivetab}
                    tabsRes={detailsTabsRes}
                    tabs={detailsTabs}
                >
                    {activeTab === 1 && (
                        <InputSelectWrTabs>
                            <FitParams />
                        </InputSelectWrTabs>
                    )}
                    {activeTab === 2 && (
                        <InputSelectWrTabs>2</InputSelectWrTabs>
                    )}
                </SearchTabs>
            </Container>
        </div>
    );
};
