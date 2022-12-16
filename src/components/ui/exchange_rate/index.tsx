import { FC, useEffect, useState } from 'react';
import s from './index.module.scss';
import Image from 'next/image';
import { useHandleRate } from 'src/hooks/header/useHandleRate';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const ExchangeRate: FC = (): JSX.Element => {
    const {
        query: { rate },
    } = useRouter();

    const { handleRate } = useHandleRate();

    return (
        <div className={s.rate_wr}>
            <div className={s.img}>
                <Image
                    src={'/assets/icons/dots.svg'}
                    alt={'dots'}
                    fill={true}
                />
            </div>

            {rate === 'usd' ? (
                <span className={s.rate} onClick={handleRate('uzs')}>
                    USD
                </span>
            ) : (
                <span className={s.rate} onClick={handleRate('usd')}>
                    UZS
                </span>
            )}
        </div>
    );
};
