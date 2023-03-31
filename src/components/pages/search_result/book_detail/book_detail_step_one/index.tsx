import React, { FC } from 'react';
import s from './index.module.scss';
import { Icon } from 'components/ui/icon';
import Image from 'next/image';

import { MapPoint } from 'components/ui/map/map_point';
import { Button } from 'components/ui/button';
import { useTranslation } from 'next-i18next';
import { IconsWrapper } from 'components/ui/icons_wrapper';

import { Map, Overlay } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';

const maptilerProvider = maptiler('Qlx00jY8FseHxRsxC7Dn', 'dataviz-light');

export const BookDetailStepOne: FC<{
    handleOrder: (val: number) => () => void;
    toggleBookDetail: (val: boolean) => () => void;
}> = ({ handleOrder, toggleBookDetail }): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div className={s.book_inner}>
            <div className={s.close_res}>
                <IconsWrapper size={'medium'} onClick={toggleBookDetail(false)}>
                    <Icon size={18} name={'chevron_left'} />
                </IconsWrapper>
            </div>

            <div className={s.map_wr_res}>
                <Map
                    provider={maptilerProvider}
                    dprs={[1, 2]}
                    defaultCenter={[41.31172327941058, 69.2818072781773]}
                    defaultZoom={15}
                >
                    <Overlay anchor={[41.31300484525912, 69.27182341706133] as [number, number]} offset={[30, 30]}>
                        <MapPoint val={1} />
                    </Overlay>
                </Map>
            </div>
            <div className={s.book_inner_top}>
                <div className={s.book_inner_top_titles}>
                    <div>
                        <h4 className={s.title}>Auto Zona Group</h4>
                        <h5 className={s.subtitle}>117405, Россия, Москва, ш. Варшавское 170-Б</h5>
                    </div>
                    <div onClick={toggleBookDetail(false)}>
                        <Icon size={20} name={'close'} />
                    </div>
                </div>

                <div className={s.details_wr}>
                    <div className={s.detail}>
                        <div className={s.detail_header}>
                            <Icon size={18} name={'call'} />
                            <p>{t('contacts')}</p>
                        </div>
                        <div className={s.detail_content}>
                            <p>8(495)320-52-36</p>
                        </div>
                    </div>

                    <div className={s.detail}>
                        <div className={s.detail_header}>
                            <Icon size={18} name={'local_shipping'} />
                            <p>{t('delivery')}</p>
                        </div>
                        <div className={s.detail_content}>
                            <p>8(495)320-52-36</p>
                        </div>
                    </div>
                    <div className={s.detail}>
                        <div className={s.detail_header}>
                            <Icon size={18} name={'watch_later'} />
                            <p>{t('workTime')}</p>
                        </div>
                        <div className={s.detail_content}>
                            <p> {t('monfri', { from: '1', to: '2' })}</p>
                            <p> {t('sunsut', { from: '1', to: '2' })}</p>

                            <div className={s.detail_border_wr}>
                                <p> {t('break', { from: '1', to: '2' })}</p>
                                <p> {t('sevendays')}</p>
                            </div>
                            <p>{t('infoonezap')}</p>
                        </div>
                    </div>
                    <div className={s.detail}>
                        <div className={s.detail_header}>
                            <Icon size={18} name={'payments'} />
                            <p>{t('payment')}</p>
                        </div>
                        <div className={s.detail_content}>
                            <p>8(495)320-52-36</p>
                        </div>
                    </div>
                    <div className={s.detail}>
                        <div className={s.detail_header}>
                            <Icon size={18} name={'home_repair_service'} />
                            <p>{t('services')}</p>
                        </div>
                        <div className={s.detail_content}>
                            <p>8(495)320-52-36</p>
                        </div>
                    </div>
                </div>
                <div className={s.photo_map_wr}>
                    <div className={s.photo_wr}>
                        <Image src={'/assets/images/shop.jpg'} alt={'shop'} fill={true} />
                    </div>
                    <div className={s.map_wr}>
                        <Map
                            provider={maptilerProvider}
                            dprs={[1, 2]}
                            defaultCenter={[41.31172327941058, 69.2818072781773]}
                            defaultZoom={15}
                        >
                            <Overlay
                                anchor={[41.31300484525912, 69.27182341706133] as [number, number]}
                                offset={[30, 30]}
                            >
                                <MapPoint val={1} />
                            </Overlay>
                        </Map>
                    </div>
                </div>
            </div>
            <div className={s.final_step}>
                <div className={s.final_Step_details}>
                    <div>
                        <p className={s.final_step_title}>PBA-001</p>
                        <p className={s.final_step_text}>PARTS-MALL</p>
                    </div>
                    <div className={s.final_step_item}>
                        <p className={s.final_step_title}>$3,5</p>
                        <p className={s.final_step_text}>В наличии </p>
                    </div>
                </div>

                <div className={s.final_Step_details_res}>
                    <div className={s.final_Step_details_top_res}>
                        <p className={s.final_step_title}>$3,5</p>
                        <p className={s.final_step_title}>PBA-001</p>
                    </div>
                    <p className={s.final_step_text}>PARTS-MALL</p>
                </div>
                <Button onClick={handleOrder(2)} variant={'primary'} fullWidth>
                    {t('toOrder')}
                </Button>
            </div>
        </div>
    );
};
