import { FC } from 'react';
import s from './index.module.scss';
import Image from 'next/image';
import { useHandleRate } from 'src/hooks/header/useHandleRate';

export const ExchangeRate: FC = (): JSX.Element => {
    const { handleRate, rate } = useHandleRate();

    return (
        <div className={s.rate_wr}>
            <div className={s.img}>
                <Image
                    src={'/assets/icons/dots.svg'}
                    alt={'dots'}
                    fill={true}
                />
            </div>

            {rate === 'uzs' ? (
                <span className={s.rate} onClick={handleRate('usd')}>
                    UZS
                </span>
            ) : (
                <span className={s.rate} onClick={handleRate('uzs')}>
                    USD
                </span>
            )}
        </div>
    );
};
