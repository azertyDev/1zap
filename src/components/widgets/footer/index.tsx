import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { Container } from 'components/ui/container';
import { FooterItem } from 'components/ui/footer_item';
import BottomFooter from './bottom_footer';
import s from './index.module.scss';

const footerLinksFirst = {
    id: 1,
    title: 'footer:aboutUs',
    links: [
        { id: 1, link: '#!', text: 'footer:howItWork' },
        { id: 2, link: '#!', text: 'footer:job' },
        { id: 3, link: '#!', text: 'footer:aboutUs' },
        { id: 4, link: '#!', text: 'footer:contacts' },
    ],
};

const footerLinksSec = {
    id: 2,
    title: 'footer:mainCateg',
    links: [
        { id: 1, link: '#!', text: 'footer:oil' },
        { id: 2, link: '#!', text: 'footer:batteries' },
        { id: 3, link: '#!', text: 'footer:tires' },
    ],
};

const footerLinksThird = {
    id: 2,
    title: 'footer:becomeSupplier',
    links: [
        { id: 1, link: '#!', text: 'footer:addDetail' },
        { id: 2, link: '#!', text: 'footer:terms' },
        { id: 3, link: '#!', text: 'footer:helpCenter' },
    ],
};

const footerLinksFourth = {
    id: 2,
    title: 'footer:support',
    links: [
        { id: 1, link: '#!', text: 'footer:infoCenter' },
        { id: 2, link: '#!', text: 'footer:support' },
        { id: 3, link: '#!', text: 'footer:trustSecur' },
    ],
};

export const Footer: FC = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={s.footer}>
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
        </div>
    );
};
