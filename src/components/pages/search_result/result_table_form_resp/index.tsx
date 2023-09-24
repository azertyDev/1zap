import { FC } from 'react';
import s from './index.module.scss';
import { useTranslation } from 'next-i18next';
import { useStore } from 'src/store/useStore';
import { formatNumber } from 'src/helpers/formatNumber';
import { IProduct } from 'types';

export const ResultTableFormResp: FC<{ data: IProduct[] }> = ({ data }): JSX.Element => {
    const { t } = useTranslation();
    const { toggleBookDetail, currency } = useStore((state) => state);
    return (
        <>
            {data.map((item) => {
                return (
                    <div className={s.table_wr} key={item.id}>
                        <div className={s.table}>
                            <div className={s.titles_big_wr}>
                                <p className={s.titles_big}>{item.manufacturer}</p>
                                <p className={s.titles_big}>{item.uniqNumber}</p>
                            </div>
                            <div className={s.info_wr}>
                                <p className={s.titles_small}>
                                    {currency === 'usd'
                                        ? `$${formatNumber(item.usd)}`
                                        : `${formatNumber(parseInt(`${item.sum}`))} ${t('common:sum')}`}
                                    /{t('common:howmany')}
                                </p>
                                <p className={s.titles_small}>
                                    {formatNumber(item.availability)} {t('common:howmany')}
                                </p>
                                <p className={s.titles_small}>{t(`common:selects.${item.shipment}`)}</p>
                                {/*<p className={`${s.titles_small} ${s.info_img}`}>*/}
                                {/*    <Icon size={14} name={'autorenew'} color={'#0D0A19'} />*/}
                                {/*    <span>24{t('common:hourago')}</span>*/}
                                {/*</p>*/}
                            </div>
                            <p className={s.text}>{item.pltext ? item.pltext : item.ltext}</p>
                            <p className={s.titles_small}>{item.description}</p>

                            <p className={s.text}>{item.rtext}</p>
                            <div className={s.order_wr}>
                                <p className={s.titles_big}>{item.landmark}</p>
                                <button
                                    type={'button'}
                                    onClick={toggleBookDetail(true, item.branchId, item.id, item.providerId)}
                                >
                                    {t('common:opencontact')}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};
