import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Cookies from 'js-cookie';
import Link from 'next/link';

import { Container } from 'components/ui/container';
import { Logo } from 'components/ui/logo';
import { Language } from 'components/ui/language';
import { ExchangeRate } from 'components/ui/exchange_rate';
import { LoginModal } from 'components/ui/login_modal';
import { useOpenCloseWithVal } from 'src/hooks/common/useOpenCloseWithVal';

import s from './index.module.scss';
import { useStore } from 'src/store/useStore';

export const Header: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const { userData } = useStore();
    const token = Cookies.get('token');
    const [signedIn, setSignedIn] = useState<boolean>(false);

    const isAdmin = userData?.user.role === 'admin';

    useEffect(() => {
        setSignedIn(!!token);
    }, [token]);

    const { openClose, handleOpenClose } = useOpenCloseWithVal();

    return (
        <header>
            <Container>
                <div className={s.inner}>
                    <Link href={'/'}>
                        <Logo />
                    </Link>

                    <div className={s.controls}>
                        <ExchangeRate />
                        <Language />
                        {signedIn ? (
                            <Link href={isAdmin ? '/dashboard/main' : '/dashboard/merchant'}>
                                {userData?.user.fullName}
                            </Link>
                        ) : (
                            <div className={s.login} onClick={handleOpenClose(true)}>
                                <div className={s.img_block}>
                                    <Image src={'/assets/icons/person.svg'} alt={'user'} width={16} height={16} />
                                </div>
                                <span className={s.text}>{t('header:login')}</span>
                            </div>
                        )}

                        {openClose && <LoginModal fun={handleOpenClose} />}
                    </div>
                </div>
            </Container>
        </header>
    );
};
