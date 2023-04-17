import s from './index.module.scss';

import { Icon } from 'components/ui/icon';
import { useStore } from 'src/store/useStore';
import { useCallback, useEffect } from 'react';

export const ExchangeRate = (): JSX.Element => {
    const { currency, setCurrency } = useStore((state) => state);

    useEffect(() => {
        const stored = localStorage.getItem('currency');
        setCurrency(stored ? stored : 'uzs');
    }, []);

    const handleCurrency = useCallback((val: string) => {
        return () => {
            localStorage.setItem('currency', val);
            setCurrency(val);
        };
    }, []);

    return (
        <div className={s.rate_wr}>
            <div className={s.img}>
                <Icon size={19} name={'more_horiz'} />
            </div>

            {currency === 'usd' && (
                <span className={s.rate} onClick={handleCurrency('uzs')}>
                    USD
                </span>
            )}
            {currency === 'uzs' && (
                <span className={s.rate} onClick={handleCurrency('usd')}>
                    UZS
                </span>
            )}
        </div>
    );
};
