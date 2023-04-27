import { CenterWrapper } from 'components/pages/center/items/wrapper';

import { useTranslation } from 'next-i18next';
import { CenterCall } from 'components/pages/center/items/call';

import s from './index.module.scss';
import { BlockQuestion } from 'components/pages/center/items/block_question';
import { useRouter } from 'next/router';
import { CenterBreadCrumbs } from 'components/pages/center/items/breadcrumbs';
import { CenterCategory } from 'components/pages/center/items/category';

export const ClientCenterCategory = (): JSX.Element => {
    const { t } = useTranslation('center');

    const {
        query: { id },
    } = useRouter();

    return (
        <div className={s.wr}>
            <CenterBreadCrumbs linkOne={'Поиск и бронирование'} />
            <CenterCategory
                links={[
                    { text: 'search_book', id: 1 },
                    { text: 'catalogs', id: 2 },
                    { text: 'extra', id: 3 },
                ]}
            />

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
