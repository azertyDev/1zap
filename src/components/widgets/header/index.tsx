import { FC } from 'react';
import Link from 'next/link';

import s from './index.module.scss';

import { Container } from 'components/ui/container';
import { Logo } from 'components/ui/logo';
import { Language } from 'components/ui/language';
import { ExchangeRate } from 'components/ui/exchange_rate';

import { useTranslation } from 'next-i18next';
import Image from 'next/image';

export const Header: FC = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={s.header}>
            <Container>
                <div className={s.inner}>
                    <Logo />
                    <div className={s.controls}>
                        <ExchangeRate />
                        <Language />
                        <Link href={'#'} className={s.login}>
                            <div className={s.img_block}>
                                <Image
                                    src={'/assets/icons/person.svg'}
                                    alt={'user'}
                                    width={16}
                                    height={16}
                                />
                            </div>
                            <span className={s.text}>{t('header:login')}</span>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};
