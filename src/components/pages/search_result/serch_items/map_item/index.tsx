import s from './index.module.scss';
import Image from 'next/image';
import React, { FC } from 'react';
import { MapPoint } from 'components/ui/map/map_point';

export const MapItem: FC<{ amount: number; price: number; toggleBookDetail: (val: boolean) => () => void }> = ({
    amount,
    price,
    toggleBookDetail,
}) => {
    return (
        <div className={s.mark} onClick={toggleBookDetail(true)}>
            <MapPoint val={amount} />
            <div className={s.mark_price}>$3,5</div>
        </div>
    );
};
