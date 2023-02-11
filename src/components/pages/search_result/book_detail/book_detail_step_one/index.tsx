import React, {FC} from 'react';
import s from './index.module.scss';
import {Icon} from 'components/ui/icon';
import Image from 'next/image';
import {Map, Overlay} from 'pigeon-maps';
import {MapPoint} from 'components/ui/map_point';
import {Button} from 'components/ui/button';
import {useTranslation} from 'next-i18next';
import {IconsWrapper} from 'components/ui/icons_wrapper';

export const BookDetailStepOne: FC<{
    handleOrder: (val: number) => () => void;
    handleOpen: (val: boolean) => () => void;
}> = ({handleOrder, handleOpen}): JSX.Element => {
    const {t} = useTranslation();
    return (
        <div className={s.book_inner}>
            <div className={s.close_res}>
                <IconsWrapper size={'medium'} onClick={handleOpen(false)}>
                    <Icon size={18} name={'chevron_left'}/>
                </IconsWrapper>
            </div>

            <div className={s.map_wr_res}>
                <Map
                    defaultCenter={[41.31300484525912, 69.27182341706133]}
                    defaultZoom={17}
                >
                    <Overlay
                        anchor={
                            [41.31300484525912, 69.27182341706133] as [
                                number,
                                number
                            ]
                        }
                        offset={[30, 30]}
                    >
                        <MapPoint val={1}/>
                    </Overlay>
                    <div className={s.shadow}></div>
                </Map>
            </div>
            <div className={s.book_inner_top}>
                <h4 className={s.title}>Auto Zona Group</h4>
                <h5 className={s.subtitle}>
                    117405, Россия, Москва, ш. Варшавское 170-Б
                </h5>
                <div className={s.details_wr}>
                    <div className={s.detail}>
                        <div className={s.detail_header}>
                            <Icon size={18} name={'call'}/>
                            <p className={s.de}>{t('contacts')}</p>
                        </div>
                        <div className={s.detail_content}>
                            <p>8(495)320-52-36</p>
                        </div>
                    </div>

                    <div className={s.detail}>
                        <div className={s.detail_header}>
                            <Icon size={18} name={'local_shipping'}/>
                            <p className={s.de}>{t('delivery')}</p>
                        </div>
                        <div className={s.detail_content}>
                            <p>8(495)320-52-36</p>
                        </div>
                    </div>
                    <div className={s.detail}>
                        <div className={s.detail_header}>
                            <Icon size={18} name={'watch_later'}/>
                            <p className={s.de}>{t('workTime')}</p>
                        </div>
                        <div className={s.detail_content}>
                            <p> {t('monfri', {from: '1', to: '2'})}</p>
                            <p> {t('sunsut', {from: '1', to: '2'})}</p>

                            <div className={s.detail_border_wr}>
                                <p> {t('break', {from: '1', to: '2'})}</p>
                                <p> {t('sevendays')}</p>
                            </div>
                            <p>{t('infoonezap')}</p>
                        </div>
                    </div>
                    <div className={s.detail}>
                        <div className={s.detail_header}>
                            <Icon size={18} name={'payments'}/>
                            <p className={s.de}>{t('payment')}</p>
                        </div>
                        <div className={s.detail_content}>
                            <p>8(495)320-52-36</p>
                        </div>
                    </div>
                    <div className={s.detail}>
                        <div className={s.detail_header}>
                            <Icon size={18} name={'home_repair_service'}/>
                            <p className={s.de}>{t('services')}</p>
                        </div>
                        <div className={s.detail_content}>
                            <p>8(495)320-52-36</p>
                        </div>
                    </div>
                </div>
                <div className={s.photo_map_wr}>
                    <div className={s.photo_wr}>
                        <Image
                            src={'/assets/images/shop.jpg'}
                            alt={'shop'}
                            fill={true}
                        />
                    </div>
                    <div className={s.map_wr}>
                        <Map
                            defaultCenter={[
                                41.31300484525912, 69.27182341706133,
                            ]}
                            defaultZoom={17}
                        >
                            <Overlay
                                anchor={
                                    [41.31300484525912, 69.27182341706133] as [
                                        number,
                                        number
                                    ]
                                }
                                offset={[30, 30]}
                            >
                                <MapPoint val={1}/>
                            </Overlay>
                            <div className={s.shadow}></div>
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
                <Button onClick={handleOrder(2)} variant={"primary"}>
                    {t('toOrder')}
                </Button>
            </div>
        </div>
    );
};
