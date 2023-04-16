import { FC } from 'react';

import s from './index.module.scss';
import { useTranslation } from 'next-i18next';
import { TableRow } from 'components/ui/table/table_row';
import { TableElement } from 'components/ui/table/table_element';
import { Icon } from 'components/ui/icon';

export const ResultTableForm: FC<{
    toggleBookDetail: (val: boolean) => () => void;
    data: any;
}> = ({ toggleBookDetail, data }): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div>
            <div className={s.table}>
                <TableRow className={s.table_row}>
                    <TableElement className={'table_h'}>{t('common:selects.company')}</TableElement>
                    <TableElement className={'table_h'}>{t('common:selects.number')}</TableElement>
                    <TableElement className={'table_h'}>{t('common:selects.nameProduct')}</TableElement>
                    <TableElement className={'table_h'}>{t('common:selects.howmany')}</TableElement>
                    <TableElement className={'table_h'}>{t('common:selects.price')}</TableElement>
                    <TableElement className={'table_h'}>{t('common:selects.seller')}</TableElement>
                </TableRow>

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
                                <p>{t('common:onezapmust')}</p>
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
                                    <span>{t('common:wehave')}</span>
                                </p>
                            </TableElement>
                            <TableElement className={'table_b'}>
                                <h5>$3,5</h5>
                                <p>{t('common:onezapmust')}</p>
                            </TableElement>
                            <TableElement className={'table_b'}>
                                <button type={'button'} onClick={toggleBookDetail(true)}>
                                    <span>{t('common:opencontact')}</span>
                                    <span>Ифтихор, 77</span>
                                </button>
                            </TableElement>
                        </TableRow>
                    );
                })}
            </div>
        </div>
    );
};
