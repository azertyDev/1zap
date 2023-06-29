import React, { FC } from 'react';

import s from './index.module.scss';
import Image from 'next/image';

export const MapPoint: FC<{ val: number; hidePoint?: boolean }> = ({ val, hidePoint }): JSX.Element => {
    return (
        <div className={`${s.point_wr} ${hidePoint ? s.hide : ''}`}>
            <Image src="/assets/icons/map_point.svg" alt={'point'} fill={true} />
            <p className={s.point_number}></p>
        </div>
    );
};
