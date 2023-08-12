import s from './index.module.scss';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { Map, Overlay } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';
import { MapPoint } from 'components/ui/map/map_point';
import { smsApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { formatNumber } from 'src/helpers/formatNumber';
import { useStore } from 'src/store/useStore';

const maptilerProvider = maptiler('Qlx00jY8FseHxRsxC7Dn', 'dataviz-light');
export const SmsOrder = () => {
    const {
        query: { id },
        pathname,
    } = useRouter();
    const { currency } = useStore((state) => state);
    const isProviderType = pathname.includes('order_provider');

    const { t } = useTranslation();
    const [data, setData] = useState<{
        address: string;
        cost: number;
        location: string;
        manufacturer: string;
        phone: string;
        shop: string;
        uniqNumber: string;
        name: string;
        usd: number;
        sum: number;
    } | null>(null);

    useEffect(() => {
        if (isProviderType) {
            smsApi
                .orderProvider(id as string)
                .then((res) => setData(res))
                .catch(() => toast.error(t('helpers:error_getting')));
        } else {
            smsApi
                .order(id as string)
                .then((res) => setData(res))
                .catch(() => toast.error(t('helpers:error_getting')));
        }
    }, []);

    return (
        <div className={s.wr}>
            {data && (
                <>
                    <div className={s.map}>
                        <Map
                            provider={maptilerProvider}
                            dprs={[1, 2]}
                            defaultCenter={JSON.parse(data.location)}
                            defaultZoom={15}
                            boxClassname={s.map}
                        >
                            <Overlay anchor={JSON.parse(data.location)} offset={[30, 30]}>
                                <MapPoint val={1} />
                            </Overlay>
                            <div className={s.shadow}></div>
                        </Map>
                    </div>
                    <div className={s.table}>
                        <div className={s.header_wr}>
                            <h1>{t('sms:detail_order')}</h1>
                            <p>{!isProviderType ? t('sms:wait_order') : t('sms:prove')}</p>
                        </div>
                        <div className={s.sub_titles_wr}>
                            <p className={s.sub_titles}>{t('sms:detail_info')}</p>
                        </div>

                        <div className={s.info_wr}>
                            <div className={s.info_box}>
                                <p className={s.sub_titles}>{t('sms:article')}</p>
                                <p className={s.sub_text}>{data.uniqNumber}</p>
                            </div>
                            <div className={s.info_box}>
                                <p className={s.sub_titles}>{t('sms:manufacturer')}</p>
                                <p className={s.sub_text}>{data.manufacturer}</p>
                            </div>
                            <div className={s.info_box}>
                                <p className={s.sub_titles}>{t('sms:price')}</p>
                                <p className={s.sub_text}>
                                    {currency === 'usd'
                                        ? `$${formatNumber(data.usd)}`
                                        : `${formatNumber(parseInt(`${data.sum}`))} ${t('common:sum')}`}
                                </p>
                            </div>
                        </div>
                        <div className={s.sub_titles_wr}>
                            <p className={s.sub_titles}>
                                {!isProviderType ? t('sms:seller_info') : t('sms:client_info')}
                            </p>
                        </div>

                        <div className={s.info_wr}>
                            {!isProviderType && (
                                <>
                                    <div className={s.info_box}>
                                        <p className={s.sub_titles}>{t('sms:shop_name')}</p>
                                        <p className={s.sub_text}>{data.shop}</p>
                                    </div>
                                    <div className={s.info_box}>
                                        <p className={s.sub_titles}>{t('sms:address')}</p>
                                        <p className={s.sub_text}>{data.address}</p>
                                    </div>
                                </>
                            )}

                            {isProviderType && (
                                <div className={s.info_box}>
                                    <p className={s.sub_titles}>{t('sms:name')}</p>
                                    <p className={s.sub_text}>{data.name}</p>
                                </div>
                            )}

                            <div className={s.info_box}>
                                <p className={s.sub_titles}>{t('sms:phone')}</p>
                                <p className={s.sub_text}>{data.phone}</p>
                            </div>
                        </div>
                        <a href={`tel:${data.phone}`} className={s.link_phone}>
                            {t('sms:call')}
                        </a>
                    </div>
                </>
            )}
        </div>
    );
};
