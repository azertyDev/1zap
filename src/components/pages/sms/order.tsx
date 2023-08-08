import s from './index.module.scss';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Map, Overlay } from 'pigeon-maps';

import { maptiler } from 'pigeon-maps/providers';
import { MapPoint } from 'components/ui/map/map_point';

const maptilerProvider = maptiler('Qlx00jY8FseHxRsxC7Dn', 'dataviz-light');
export const SmsOrder = () => {
    const {
        query: { id },
    } = useRouter();

    const { t } = useTranslation();
    const [data, setData] = useState<any>(null);

    // useEffect(() => {
    //     smsApi
    //         .order(id as string)
    //         .then((res) => setData(res))
    //         .catch(() => toast.error(t('helpers:error_getting')));
    // }, []);

    return (
        <div className={s.wr}>
            <div className={s.map}>
                <Map
                    provider={maptilerProvider}
                    dprs={[1, 2]}
                    defaultCenter={[41.31172327941058, 69.2818072781773]}
                    defaultZoom={15}
                    boxClassname={s.map}
                >
                    <Overlay anchor={[41.31172327941058, 69.2818072781773]} offset={[30, 30]}>
                        <MapPoint val={1} />
                    </Overlay>
                    <div className={s.shadow}></div>
                </Map>
            </div>
            <div className={s.table}>
                <div className={s.header_wr}>
                    <h1>{t('sms:detail_order')}</h1>
                    <p>{true ? t('sms:wait_order') : t('sms:prove')}</p>
                </div>
                <div className={s.sub_titles_wr}>
                    <p className={s.sub_titles}>{t('sms:detail_info')}</p>
                </div>

                <div className={s.info_wr}>
                    <div className={s.info_box}>
                        <p className={s.sub_titles}>{t('sms:article')}</p>
                        <p className={s.sub_text}>PBA-001</p>
                    </div>
                    <div className={s.info_box}>
                        <p className={s.sub_titles}>{t('sms:manufacturer')}</p>
                        <p className={s.sub_text}>PARTS-MALL</p>
                    </div>
                    <div className={s.info_box}>
                        <p className={s.sub_titles}>{t('sms:price')}</p>
                        <p className={s.sub_text}>3,5 $</p>
                    </div>
                </div>
                <div className={s.sub_titles_wr}>
                    <p className={s.sub_titles}>{true ? t('sms:seller_info') : t('sms:client_info')}</p>
                </div>

                <div className={s.info_wr}>
                    <div className={s.info_box}>
                        <p className={s.sub_titles}>{t('sms:shop_name')}</p>
                        <p className={s.sub_text}>Auto Zona Group</p>
                    </div>
                    <div className={s.info_box}>
                        <p className={s.sub_titles}>{t('sms:address')}</p>
                        <p className={s.sub_text}>Россия, Москва, ш. Варшавское 170-Б</p>
                    </div>
                    {/*<div className={s.info_box}>*/}
                    {/*    <p className={s.sub_titles}>{t('sms:name')}</p>*/}
                    {/*    <p className={s.sub_text}>Vadim</p>*/}
                    {/*</div>*/}
                    <div className={s.info_box}>
                        <p className={s.sub_titles}>{t('sms:phone')}</p>
                        <p className={s.sub_text}>8(495)320-52-36</p>
                    </div>
                </div>
                <a href={'tel:8(495)320-52-36'} className={s.link_phone}>
                    {t('sms:call')}
                </a>
            </div>
        </div>
    );
};
