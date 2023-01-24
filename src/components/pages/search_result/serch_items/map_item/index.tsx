import s from './index.module.scss';
import Image from 'next/image';
import React from 'react';

export const MapItem = () => {
    return (
        <div className={s.mark} onClick={() => alert(1)}>
            <div className={s.point_wr}>
                <Image
                    src="/assets/icons/map_point.svg"
                    alt={'point'}
                    fill={true}
                />
                <p className={s.point_number}>{String(1).slice(0, 2)}</p>
            </div>
            <div className={s.mark_price}>$3,5</div>
        </div>
    );
};
