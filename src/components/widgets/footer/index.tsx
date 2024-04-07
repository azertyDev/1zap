import { FC, useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { Container } from 'components/ui/container';
import { FooterItem } from 'components/ui/footer_item';

import BottomFooter from './bottom_footer';

import s from './index.module.scss';

import { footerLinksFirst, footerLinksThird, footerLinksFourth } from 'src/constants/footerLinks';
import { Language } from 'components/ui/language';
import { ExchangeRate } from 'components/ui/exchange_rate';
import Link from 'next/link';
import { Cities } from 'src/components/ui/cities';
import { useRouter } from 'next/router';

export const Footer: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const {query} =useRouter()

    const [city,setCity] = useState("all_cities")

    useEffect(()=>{
        const city= localStorage.getItem('city')
        if(city){
            setCity(city)
        }
    },[query.city])

   const footerLinksSec = {
        id: 2,
        title: 'footer:mainCateg',
        links: [
            { id: 1, link: '/request_vim', text: 'common:searchVin' },
            { id: 2, link: '/details?tab=2', text: 'common:sparePartsCat' },
            { id: 3, link: `/oil?city=${city}`, text: 'common:oil' },
            { id: 4, link: `/battery?city=${city}`, text: 'common:batteries' },
            { id: 5, link: `/tires?city${city}`, text: 'common:tires' },
        ],
    };
    

    return (
        <footer className={s.footer}>
            <div className={s.footer_top}>
                <Container>
                    <div className={s.footer_top_inner}>
                        <FooterItem title={footerLinksFirst.title} links={footerLinksFirst.links} />

                        <FooterItem title={footerLinksSec.title} links={footerLinksSec.links}></FooterItem>

                        <FooterItem title={footerLinksThird.title} links={footerLinksThird.links} />
                        <FooterItem title={footerLinksFourth.title} links={footerLinksFourth.links} />
                    </div>
                </Container>
            </div>
            <div className={s.controls_wr}>
                <Container>
                    <BottomFooter showLang={true} />
                </Container>
            </div>

            <div className={s.footer_resp}>
                <Container>
                    <div className={s.footer_resp_settings}>
                        <ExchangeRate />
                        <Language />
                    </div>
                    <div className={s.footer_resp_link}>
                        <FooterItem title={footerLinksFirst.title} links={footerLinksFirst.links} />
                        <FooterItem title={footerLinksSec.title} links={footerLinksSec.links}></FooterItem>
                        <FooterItem title={footerLinksThird.title} links={footerLinksThird.links} />
                    </div>
                    <p className={s.copy}>&copy; 2022 All rights reserved</p>
                </Container>
            </div>
        </footer>
    );
};
