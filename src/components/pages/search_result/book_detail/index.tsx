import { FC } from 'react';

import s from './index.module.scss';
import { Icon } from 'components/ui/icon';

export const BookDetail: FC = (): JSX.Element => {
    return (
        <div className={s.book_wr}>
            <div className={s.book_inner}>
                <h4 className={s.title}>Auto Zona Group</h4>
                <h5 className={s.subtitle}>
                    117405, Россия, Москва, ш. Варшавское 170-Б
                </h5>
                <div className={s.details_wr}>
                    <div className={s.detail}>
                        <div className={s.detail_header}>
                            <Icon size={18} name={'call'} />
                            <p className={s.de}>8(495)320-52-36</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

//
// <div className={s.detail_header}>
//     <Icon size={18} name={'local_shipping'} />
// </div>
// <div className={s.detail_header}>
//     <Icon size={18} name={'watch_later'} />
// </div>
// <div className={s.detail_header}>
//     <Icon size={18} name={'payments'} />
// </div>
// <div className={s.detail_header}>
//     <Icon size={18} name={'home_repair_service'} />
// </div>
