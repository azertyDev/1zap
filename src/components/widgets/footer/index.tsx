import { FC } from 'react';

import { useTranslation } from 'next-i18next';
import { Container } from 'components/ui/container';
import { FooterItem } from 'components/ui/footer_item';

import BottomFooter from './bottom_footer';

import s from './index.module.scss';

import {
    footerLinksFirst,
    footerLinksSec,
    footerLinksThird,
    footerLinksFourth,
} from 'src/constants/footerLinks';
import { Language } from 'components/ui/language';
import { ExchangeRate } from 'components/ui/exchange_rate';
import Link from 'next/link';

export const Footer: FC = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <footer className={s.footer}>
            <div className={s.footer_top}>
                <Container>
                    <div className={s.footer_top_inner}>
                        <FooterItem
                            title={footerLinksFirst.title}
                            links={footerLinksFirst.links}
                        />

                        <FooterItem
                            title={footerLinksSec.title}
                            links={footerLinksSec.links}
                        >
                            <p className={s.link}>{t('common:searchVin')}</p>
                            <p className={s.link}>
                                {t('common:sparePartsCat')}
                            </p>
                        </FooterItem>

                        <FooterItem
                            title={footerLinksThird.title}
                            links={footerLinksThird.links}
                        />
                        <FooterItem
                            title={footerLinksFourth.title}
                            links={footerLinksFourth.links}
                        />
                    </div>
                </Container>
            </div>
            <div className={s.controls_wr}>
                <Container>
                    <BottomFooter />
                </Container>
            </div>

            <div className={s.footer_resp}>
                <Container>
                    <div className={s.footer_resp_settings}>
                        <ExchangeRate />
                        <Language />
                    </div>
                    <div className={s.footer_resp_link}>
                        <FooterItem
                            title={footerLinksFirst.title}
                            links={footerLinksFirst.links}
                        />
                        <FooterItem
                            title={footerLinksSec.title}
                            links={footerLinksSec.links}
                        >
                            <p className={s.link}>{t('common:searchVin')}</p>
                            <p className={s.link}>
                                {t('common:sparePartsCat')}
                            </p>
                        </FooterItem>
                        <FooterItem
                            title={footerLinksThird.title}
                            links={footerLinksThird.links}
                        />
                    </div>
                    <p className={s.copy}>&copy; 2022 All rights reserved</p>
                </Container>
            </div>
        </footer>
    );
};
