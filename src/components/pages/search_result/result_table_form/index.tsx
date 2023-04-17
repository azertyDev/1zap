import { FC } from 'react';

import s from './index.module.scss';
import { useTranslation } from 'next-i18next';
import { TableRow } from 'components/ui/table/table_row';
import { TableElement } from 'components/ui/table/table_element';
import { Icon } from 'components/ui/icon';
import { useStore } from 'src/store/useStore';
import { formatPrice } from 'src/helpers/formatPrice';

export const ResultTableForm: FC<{ data: IProduct[] }> = ({ data }): JSX.Element => {
    const { t } = useTranslation();
    const { toggleBookDetail } = useStore((state) => state);
    const { currency } = useStore((state) => state);

    return (
        <div>
            <div className={s.table}>
                {data.length > 0 && (
                    <>
                        <TableRow className={s.table_row}>
                            <TableElement className={'table_h'}>{t('common:selects.company')}</TableElement>
                            <TableElement className={'table_h'}>{t('common:selects.number')}</TableElement>
                            <TableElement className={'table_h'}>{t('common:selects.nameProduct')}</TableElement>
                            <TableElement className={'table_h'}>{t('common:selects.howmany')}</TableElement>
                            <TableElement className={'table_h'}>{t('common:selects.price')}</TableElement>
                            <TableElement className={'table_h'}>{t('common:selects.seller')}</TableElement>
                        </TableRow>
                    </>
                )}

                {data.map((item:any) => {
                    return (
                        <TableRow key={item.id} className={s.table_row}>
                            <TableElement className={'table_b'}>
                                <h5>{item.manufacturer}</h5>
                            </TableElement>
                            <TableElement className={'table_b'}>
                                <h5>{item.uniqNumber}</h5>
                                <p>{t('common:requiredNumber')}</p>
                            </TableElement>
                            <TableElement className={'table_b'}>
                                <h5>{item.description}</h5>
                                <p>{item.ltext}</p>
                            </TableElement>
                            <TableElement className={'table_b'}>
                                <h5>
                                    {item.availability} {t('common:howmany')}
                                </h5>
                                <p>
                                    <span className={s.howmany_wr}>
                                        <Icon size={14} name={'autorenew'} color={'#0D0A19'} />
                                        <span>24</span>
                                        {t('common:hourago')}
                                    </span>

                                    <span> {item.availability > 0 ? t('common:wehave') : t('common:wedonthave')}</span>
                                </p>
                            </TableElement>
                            <TableElement className={'table_b'}>
                                <h5>{currency === 'usd' ? `$${item.usd}` : `${formatPrice(String(item.sum))} сум`}</h5>
                                <p>{item.rtext}</p>
                            </TableElement>
                            <TableElement className={'table_b'}>
                                <button
                                    type={'button'}
                                    onClick={toggleBookDetail(true, item.branchId, item.id, item.providerId)}
                                >
                                    <span>{t('common:opencontact')}</span>
                                    <span>{item.landmark}</span>
                                </button>
                            </TableElement>
                        </TableRow>
                    );
                })}
            </div>
        </div>
    );
};
