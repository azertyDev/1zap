import s from './index.module.scss';
import { createContext, FC } from 'react';
import { useTranslation } from 'next-i18next';
import { SearchHome } from 'components/pages/home/search_home';
import { Swiper, SwiperSlide } from 'swiper/react';
import { homeSwiperBreakpoints } from 'src/constants/home_swiper_breakpoints';
import { Autoplay } from 'swiper';

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

export const catalogContext = createContext({ dataRes: '' });

export const Home: FC<{ data: { dataRes: string } }> = ({ data }): JSX.Element => {
    const { t } = useTranslation();

    return (
        <main className={s.home}>
            <h1 className={s.title}>{t('home:market')}</h1>

            <catalogContext.Provider value={data}>
                <SearchHome />
            </catalogContext.Provider>

            <div className={'home_page_partners'}>
                <Swiper
                    breakpoints={homeSwiperBreakpoints}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: true,
                    }}
                >
                    {fakePartners.map((item) => {
                        return (
                            <SwiperSlide className={'home_page_partners_slide'} key={item.id}>
                                <div className={'home_page_partners_slide_img'}>
                                    <img src={item.img} alt={'partners'} />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </main>
    );
};
