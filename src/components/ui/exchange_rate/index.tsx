import { FC, useEffect, useState } from 'react';
import s from './index.module.scss';
import Image from 'next/image';
import { useHandleRate } from 'src/hooks/header/useHandleRate';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from 'components/ui/icon';

export const ExchangeRate: FC = (): JSX.Element => {
    const {
        query: { rate },
    } = useRouter();

    const { handleRate } = useHandleRate();

    return (
        <div className={s.rate_wr}>
            <div className={s.img}>
                <Icon size={'19'} name={'more_horiz'} />
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
