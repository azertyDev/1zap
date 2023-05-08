import { Title } from 'components/ui/title';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import s from './index.module.scss';
import { Container } from 'components/ui/container';
import { aboutLinks } from 'src/constants/about_links';
import Link from 'next/link';

export const AboutMenu = () => {
    const { pathname } = useRouter();
    const { t } = useTranslation();

    return (
        <div className={s.wr}>
            <Container>
                <h1 className={s.title}>{t(`about:${pathname.slice(1)}`)}</h1>
                <div className={s.links_wr}>
                    {aboutLinks.map((item) => {
                        return (
                            <Link
                                href={item.link}
                                key={item.id}
                                className={`${s.link} ${
                                    pathname.slice(1) === item.text || pathname.slice(1) === item.exText ? s.active : ''
                                }`}
                            >
                                {t(`about:${item.text}`)}
                            </Link>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
};
