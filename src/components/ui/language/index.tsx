import { FC, useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';

import s from './index.module.scss';
import Image from 'next/image';

import { useHandleLang } from 'src/hooks/header/useHandleLang';
import { Icon } from 'components/ui/icon';

export const Language: FC = (): JSX.Element => {
    const { asPath, pathname, query, locale } = useRouter();
    const { handlelang } = useHandleLang();

    return (
        <div className={s.lang_wr}>
            <div className={s.img}>
                <Icon size={18} name={'public'} />
            </div>

            {locale === 'ru' ? (
                <Link
                    passHref
                    className={s.link}
                    as={asPath}
                    locale={'uz'}
                    href={{ pathname, query }}
                    onClick={handlelang('uz')}
                >
                    Русский
                </Link>
            ) : (
                <Link
                    passHref
                    className={s.link}
                    as={asPath}
                    locale={'ru'}
                    href={{ pathname, query }}
                    onClick={handlelang('ru')}
                >
                    {"O'zbek"}
                </Link>
            )}
        </div>
    );
};
