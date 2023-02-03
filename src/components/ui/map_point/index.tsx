import React, { FC } from 'react';

import s from './index.module.scss';
import Image from 'next/image';

export const MapPoint: FC<{ val: number }> = ({ val }): JSX.Element => {
    return (
        <div className={s.point_wr}>
            <Image
                src="/assets/icons/map_point.svg"
                alt={'point'}
                fill={true}
            />
            <p className={s.point_number}>{String(val).slice(0, 2)}</p>
        </div>
    );
};
