import s from './index.module.scss';
import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { SearchHome } from 'components/search_home';
import { Icon } from 'components/ui/icon';

const fakePartners = [
    {
        id: 1,
        img: '/assets/images/home/chevrolet.svg',
    },
    {
        id: 2,
        img: '/assets/images/home/daewoo.svg',
    },
    {
        id: 3,
        img: '/assets/images/home/lada.svg',
    },
    {
        id: 4,
        img: '/assets/images/home/hyundai.svg',
    },
];

export const Home: FC = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={s.home}>
            <h1 className={s.title}>{t('home:market')}</h1>
            <SearchHome />
            <div className={s.partners}></div>
            <Icon size={'md'} color={s.color} name={'ads_click'} />
        </div>
    );
};
