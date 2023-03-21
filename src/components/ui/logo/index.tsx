import { FC } from 'react';

import s from './index.module.scss';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export const Logo: FC = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div className={s.logo}>
            <div className={s.logoOne}>
                <Image
                    src={'/assets/icons/logoOne.svg'}
                    alt={'logo'}
                    fill
                    priority
                    sizes="
                            55
                            (max-width: 768px) 33,
                          "
                />
            </div>
            <div className={s.right}>
                <div className={s.logoZap}>
                    <Image
                        src={'/assets/icons/logoZap.svg'}
                        alt={'logo'}
                        fill
                        sizes="
                            71
                            (max-width: 768px) 42,
                          "
                    />
                </div>
                <p className={s.text}>{t('header:comparebuy')}</p>
            </div>
        </div>
    );
};
