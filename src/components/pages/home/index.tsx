import s from './index.module.scss';
import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { SearchHome } from 'components/search_home';

export const Home: FC = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={s.home}>
            <h1 className={s.title}>{t('home:market')}</h1>
            <SearchHome />
        </div>
    );
};
