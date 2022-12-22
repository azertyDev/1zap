import React, { FC, useRef } from 'react';

import { Map, Marker, Overlay } from 'pigeon-maps';
import s from './index.module.scss';
import Image from 'next/image';

const CustomIcon = () => {
    return (
        <div className={s.mark}>
            <div className={s.point_wr} onClick={() => alert(1)}>
                <Image
                    onClick={() => alert(1)}
                    src="/assets/icons/map_point.svg"
                    alt={'point'}
                    fill={true}
                />
                <p className={s.point_number}>2</p>
            </div>
            <div className={s.mark_price}>$3,5</div>
        </div>
    );
};

export const ResultMap: FC = (): JSX.Element => {
    return (
        <div className={s.map}>
            <Map
                height={500}
                defaultCenter={[41.31300484525912, 69.27182341706133]}
                defaultZoom={17}
            >
                <img
                    className={s.filterG}
                    src="/assets/images/search/mask.png"
                    alt={'point'}
                />

                <Overlay
                    anchor={[41.31240320650527, 69.27836058056674]}
                    offset={[30, 30]}
                >
                    <CustomIcon />
                </Overlay>
            </Map>
        </div>
    );
};
