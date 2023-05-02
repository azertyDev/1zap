import { CenterWrapper } from 'components/pages/center/items/wrapper';
import { BlockTheme } from 'components/pages/center/items/block_theme';
import { useTranslation } from 'next-i18next';
import { CenterCall } from 'components/pages/center/items/call';

import s from './index.module.scss';
import { BlockQuestion } from 'components/pages/center/items/block_question';

export const ClientCenterMain = (): JSX.Element => {
    const { t } = useTranslation('center');

    return (
        <div className={s.wr}>
            <CenterWrapper title={t('main_theme')}>
                <BlockTheme title={t('search_book')} icon={'search'} link={'/center/category/1'}>
                    <li>{t('search_bas')}</li>
                    <li>{t('search_map')}</li>
                    <li>{t('search_filter')}</li>
                    <li>{t('booking')}</li>
                    <li>{t('vin')}</li>
                </BlockTheme>
                <BlockTheme title={t('catalogs')} icon={'event_note'} link={'/center/category/2'}>
                    <li>{t('details_cat')}</li>
                    <li>{t('details_acc')}</li>
                    <li>{t('oil_cat')}</li>
                    <li>{t('tire_cat')}</li>
                    <li>{t('no_detail')}</li>
                </BlockTheme>
                <BlockTheme title={t('extra')} icon={'insert_chart'} link={'/center/category/3'}>
                    <li>{t('how_to_become')}</li>
                    <li>{t('politic')}</li>
                    <li>{t('oferta')}</li>
                </BlockTheme>
            </CenterWrapper>

            <CenterWrapper title={t('popular_quest')}>
                <BlockQuestion
                    title={'Заголовок'}
                    text={'Найдите деталь максимально подходящую вам по локации'}
                    id={1}
                />
            </CenterWrapper>

            <CenterCall />
        </div>
    );
};
