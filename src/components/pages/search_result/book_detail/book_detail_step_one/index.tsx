import React, { FC, useEffect, useState } from 'react';
import s from './index.module.scss';
import { Icon } from 'components/ui/icon';
import Image from 'next/image';
import { MapPoint } from 'components/ui/map/map_point';
import { Button } from 'components/ui/button';
import { useTranslation } from 'next-i18next';
import { IconsWrapper } from 'components/ui/icons_wrapper';
import { Map, Overlay } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';
import { branchApi, productsApi } from 'src/utils/api';
import { useStore } from 'src/store/useStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { formatPhoneToClient } from 'src/helpers/formatPhoneToClient';
import { formatNumber } from 'src/helpers/formatNumber';
import { IBranchData, IPieceProduct } from 'types';
import { toast } from 'react-hot-toast';

const maptilerProvider = maptiler('Qlx00jY8FseHxRsxC7Dn', 'dataviz-light');

export const BookDetailStepOne: FC<{
    handleOrder: (val: number) => () => void;
    toggleBookDetail: (val: boolean) => () => void;
    value: null;
}> = ({ handleOrder, toggleBookDetail, value }): JSX.Element => {
    const { t } = useTranslation();
    const [branch, setBranch] = useState<IBranchData | null>(value);
    const [product, setProdcut] = useState<IPieceProduct | null>(value);
    const { branchId, productId, currency } = useStore((state) => state);

    useEffect(() => {
        (() => {
            branchId &&
                branchApi
                    .getBranchById(branchId as number)
                    .then((res) => {
                        setBranch(res);
                    })
                    .catch((err) => toast.error(t('helpers:can_accept')));
            productId &&
                productsApi
                    .getPieceProduct(productId)
                    .then((res) => {
                        setProdcut(res);
                    })
                    .catch((err) => toast.error(t('helpers:can_accept')));
        })();
    }, [branchId, productId]);

    return (
        <div className={s.book_inner}>
            <div className={s.close_res}>
                <IconsWrapper size={'medium'} onClick={toggleBookDetail(false)}>
                    <Icon size={18} name={'chevron_left'} />
                </IconsWrapper>
            </div>

            {branch && product && (
                <>
                    <div className={s.map_wr_res}>
                        <Map provider={maptilerProvider} dprs={[1, 2]} defaultCenter={JSON.parse(branch.location)}>
                            <Overlay anchor={JSON.parse(branch.location)} offset={[30, 30]}>
                                <MapPoint val={product.availability} />
                            </Overlay>
                        </Map>
                    </div>
                    <div className={s.book_inner_top}>
                        <div className={s.book_inner_top_titles}>
                            <div>
                                <h4 className={s.title}>{branch.branchName}</h4>
                                <h5 className={s.subtitle}>{branch.landmark}</h5>
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
                                    <p>{formatPhoneToClient(branch.phone)}</p>
                                </div>
                            </div>

                            <div className={s.detail}>
                                <div className={s.detail_header}>
                                    <Icon size={18} name={'local_shipping'} />
                                    <p>{t('delivery')}</p>
                                </div>
                                <div className={s.detail_content}>
                                    {branch.delivery.map((item) => {
                                        return (
                                            item.isActive && (
                                                <p key={item.method}>{t(`common:selects.${item.method}`)}</p>
                                            )
                                        );
                                    })}
                                </div>
                            </div>
                            <div className={s.detail}>
                                <div className={s.detail_header}>
                                    <Icon size={18} name={'watch_later'} />
                                    <p>{t('workTime')}</p>
                                </div>
                                <div className={s.detail_content}>
                                    <div>
                                        <p>{t('common:workingScheduleText')}:</p>
                                        <p>
                                            {branch.workingSchedule} ({t('common:break')}{' '}
                                            {branch.breakTime === 'without_break'
                                                ? t('without_break')
                                                : branch.breakTime}
                                            )
                                        </p>
                                    </div>
                                    <div className={s.detail_border_wr}>
                                        <p>{t('common:weekendSchedule')}:</p>
                                        <p>
                                            {t(`common:weekend.${branch.weekend}`)}({branch.weekendSchedule})
                                        </p>
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
                                    {branch.payment.map((item) => {
                                        return (
                                            item.isActive && (
                                                <p key={item.method}>{t(`common:selects.${item.method}`)}</p>
                                            )
                                        );
                                    })}
                                </div>
                            </div>
                            <div className={s.detail}>
                                <div className={s.detail_header}>
                                    <Icon size={18} name={'home_repair_service'} />
                                    <p>{t('services')}</p>
                                </div>
                                <div className={s.detail_content}>
                                    {branch.service.map((item) => {
                                        return (
                                            item.isActive && <p key={item.name}>{t(`common:selects.${item.name}`)}</p>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={s.photo_map_wr}>
                            <div className={s.photo_wr}>
                                <Swiper
                                    spaceBetween={5}
                                    slidesPerView={1}
                                    modules={[Pagination]}
                                    pagination={{ clickable: true }}
                                >
                                    {branch.images.map((item) => {
                                        return (
                                            <SwiperSlide key={item.id + branch.branchName + branch.id}>
                                                <div className={s.photo_wr_imgs}>
                                                    <img src={item.url} alt={'shop'} />
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </div>
                            <div className={s.map_wr}>
                                <Map
                                    provider={maptilerProvider}
                                    dprs={[1, 2]}
                                    defaultCenter={JSON.parse(branch.location)}
                                >
                                    <Overlay anchor={JSON.parse(branch.location)} offset={[30, 30]}>
                                        <MapPoint val={product.availability} />
                                    </Overlay>
                                </Map>
                            </div>
                        </div>
                    </div>
                    <div className={s.final_step}>
                        {product && (
                            <>
                                <div className={s.final_Step_details}>
                                    <div>
                                        <p className={s.final_step_title}>{product.uniqNumber}</p>
                                        <p className={s.final_step_text}>{product.manufacturer}</p>
                                    </div>
                                    <div className={s.final_step_item}>
                                        <p className={s.final_step_title}>
                                            {currency === 'uzs'
                                                ? `${formatNumber(product.sum)} ${t('common:sum')}`
                                                : `$${formatNumber(product.usd)}`}
                                        </p>
                                    </div>
                                </div>

                                <div className={s.final_Step_details_res}>
                                    <div className={s.final_Step_details_top_res}>
                                        <p className={s.final_step_title}>
                                            {' '}
                                            {currency === 'uzs'
                                                ? `${formatNumber(product.sum)} ${t('common:sum')}`
                                                : `$${formatNumber(product.usd)}`}
                                        </p>
                                        <p className={s.final_step_title}>{product.uniqNumber}</p>
                                    </div>
                                    <p className={s.final_step_text}>{product.manufacturer}</p>
                                </div>
                            </>
                        )}

                        <Button onClick={handleOrder(2)} variant={'primary'} fullWidth>
                            {t('toOrder')}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};
