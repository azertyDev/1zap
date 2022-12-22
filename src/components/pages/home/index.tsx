import s from './index.module.scss';
import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { SearchHome } from 'components/pages/home/search_home';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Image from 'next/image';

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
    {
        id: 5,
        img: '/assets/images/home/hyundai.svg',
    },
];

export const Home: FC = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <main className={s.home}>
            <h1 className={s.title}>{t('home:market')}</h1>
            <SearchHome />
            <div className={s.partners}>
                <Swiper spaceBetween={15} slidesPerView={4.3}>
                    {fakePartners.map((item) => {
                        return (
                            <SwiperSlide key={item.id}>
                                <div className={s.slide}>
                                    <Image
                                        src={item.img}
                                        alt={'partner'}
                                        fill={true}
                                    />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </main>
    );
};
