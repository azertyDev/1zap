import s from './index.module.scss';
import Image from 'next/image';
import React, { FC } from 'react';
import { MapPoint } from 'components/ui/map/map_point';
import { useStore } from 'src/store/useStore';
import { formatPrice } from 'src/helpers/formatPrice';
import { useTranslation } from 'next-i18next';

export const MapItem: FC<{
    amount: number;
    price: { sum: number; usd: number };
    branchId: number;
    productId: number;
    providerId: number;
}> = ({ amount, price, branchId, productId, providerId }) => {
    const { toggleBookDetail, currency } = useStore((state) => state);
    const { t } = useTranslation('common');
    return (
        <div className={s.mark} onClick={toggleBookDetail(true, branchId, productId, providerId)}>
            <MapPoint val={amount} />
            <div className={s.mark_price}>
                {currency === 'uzs' ? `${formatPrice(String(price.sum))} ${t('sum')}` : `$${price.usd}`}
            </div>
        </div>
    );
};
