import { FC } from 'react';

import { useTranslation } from 'next-i18next';
import { Container } from 'components/ui/container';
import { FooterItem } from 'components/ui/footer_item';

import BottomFooter from './bottom_footer';

import s from './index.module.scss';

import {footerLinksFirst,footerLinksSec,footerLinksThird,footerLinksFourth} from "src/constants/footerLinks";



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
                        >
                            <p className={s.link}>
                                {t('footer:createAccount')}
                            </p>
                        </FooterItem>
                        <FooterItem
                            title={footerLinksFourth.title}
                            links={footerLinksFourth.links}
                        />
                    </div>
                </Container>
            </div>
            <Container>
                <BottomFooter />
            </Container>
        </footer>
    );
};
