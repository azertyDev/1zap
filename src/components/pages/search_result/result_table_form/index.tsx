import { FC } from 'react';

import s from './index.module.scss';
import { useTranslation } from 'next-i18next';
import { TableRow } from 'components/ui/table/table_row';
import { TableElement } from 'components/ui/table/table_element';
import { Icon } from 'components/ui/icon';

export const ResultTableForm: FC<{
    toggleBookDetail: (val: boolean) => () => void;
}> = ({ toggleBookDetail }): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div>
            <div className={s.table}>
                <TableRow className={s.table_row}>
                    <TableElement className={'table_h'}>{t('filter:company')}</TableElement>
                    <TableElement className={'table_h'}>{t('filter:number')}</TableElement>
                    <TableElement className={'table_h'}>{t('filter:nameProduct')}</TableElement>
                    <TableElement className={'table_h'}>{t('filter:howmany')}</TableElement>
                    <TableElement className={'table_h'}>{t('filter:price')}</TableElement>
                    <TableElement className={'table_h'}>{t('filter:seller')}</TableElement>
                </TableRow>
                <TableRow className={s.table_row}>
                    <TableElement className={'table_b'}>
                        <h5>PARTS-MALL</h5>
                    </TableElement>
                    <TableElement className={'table_b'}>
                        <h5>PBA-001</h5>
                        <p>{t('common:requiredNumber')}</p>
                    </TableElement>
                    <TableElement className={'table_b'}>
                        <h5>PBA001PMC_фильтр масляный!\ Mazda 323/3/626,Nissan Primera 1.3-2.2 89</h5>
                        <p>{t('common:onezapmust')}</p>
                    </TableElement>
                    <TableElement className={'table_b'}>
                        <h5>177 {t('common:howmany')}</h5>
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
            </div>
        </div>
    );
};
