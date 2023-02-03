import s from './index.module.scss';
import Image from 'next/image';
import React, { FC } from 'react';
import { MapPoint } from 'components/ui/map_point';

export const MapItem: FC<{ amount: number; price: number }> = ({
    amount,
    price,
}) => {
    return (
        <div className={s.mark} onClick={() => alert(1)}>
            <MapPoint val={amount} />
            <div className={s.mark_price}>$3,5</div>
        </div>
    );
};
