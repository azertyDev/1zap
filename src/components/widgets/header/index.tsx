import { FC, useState } from 'react';
import Link from 'next/link';

import s from './index.module.scss';

import { Container } from 'components/ui/container';
import { Logo } from 'components/ui/logo';
import { Language } from 'components/ui/language';
import { ExchangeRate } from 'components/ui/exchange_rate';

import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { Icon } from 'components/ui/icon';
import { LoginModal } from 'components/ui/login_modal';
import { useSSR } from 'react-i18next';
import { useOpenCloseWithVal } from 'src/hooks/common/useOpenCloseWithVal';

export const Header: FC = (): JSX.Element => {
    const { t } = useTranslation();

    const { openClose, handleOpenClose } = useOpenCloseWithVal();

    return (
        <header className={s.header}>
            <Container>
                <div className={s.inner}>
                    <Link href={'/'}>
                        <Logo />
                    </Link>

                    <div className={s.controls}>
                        <ExchangeRate />
                        <Language />
                        <div

                            className={s.login}
                            onClick={handleOpenClose(true)}
                        >
                            <div className={s.img_block}>
                                <Image
                                    src={'/assets/icons/person.svg'}
                                    alt={'user'}
                                    width={16}
                                    height={16}
                                />
                            </div>
                            <span className={s.text}>{t('header:login')}</span>
                        </div>

                        {openClose && <LoginModal fun={handleOpenClose} />}
                    </div>
                </div>
            </Container>
        </header>
    );
};
