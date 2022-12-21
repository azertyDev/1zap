import React, { FC, useRef } from 'react';
import { Map } from '@pbe/react-yandex-maps';
import { Placemark } from '@pbe/react-yandex-maps';

import s from './index.module.scss';

export const ResultMap: FC = (): JSX.Element => {
    const ref = useRef();
    console.log(ref);
    return (
        <div className={s.map}>
            <Map
                className={s.mapy}
                defaultState={{
                    center: [41.3112251917356, 69.28051293895349],
                    zoom: 14,
                    controls: ['zoomControl', 'fullscreenControl'],
                }}
            >
                <Placemark geometry={[41.3112251917356, 69.28051293895349]} />
            </Map>
        </div>
    );
};
