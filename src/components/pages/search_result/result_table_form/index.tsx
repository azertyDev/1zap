import { FC } from 'react';

import s from './index.module.scss';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

export const ResultTableForm: FC<{ fun: (val: boolean) => () => void }> = ({
    fun,
}): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={s.table_wr}>
            <div className={s.table}>
                <div className={s.table_row}>
                    <div className={`${s.table_el} ${s.table_h}`}>
                        {t('filter:company')}
                    </div>
                    <div className={`${s.table_el} ${s.table_h}`}>
                        {t('filter:number')}
                    </div>
                    <div className={`${s.table_el} ${s.table_h}`}>
                        {t('filter:nameProduct')}
                    </div>
                    <div className={`${s.table_el} ${s.table_h}`}>
                        {t('filter:howmany')}
                    </div>
                    <div className={`${s.table_el} ${s.table_h}`}>
                        {t('filter:price')}
                    </div>
                    <div className={`${s.table_el} ${s.table_h}`}>
                        {t('filter:seller')}
                    </div>
                </div>

                <div className={s.table_row}>
                    <div className={`${s.table_el} ${s.table_b}`}>
                        <h5>PARTS-MALL</h5>
                    </div>
                    <div className={`${s.table_el} ${s.table_b}`}>
                        <h5>PBA-001</h5>
                        <p>{t('common:requiredNumber')}</p>
                    </div>
                    <div className={`${s.table_el} ${s.table_b}`}>
                        <h5>
                            PBA001PMC_фильтр масляный!\ Mazda 323/3/626,Nissan
                            Primera 1.3-2.2 89
                        </h5>
                        <p>{t('common:onezapmust')}</p>
                    </div>
                    <div className={`${s.table_el} ${s.table_b}`}>
                        <h5>177 {t('common:howmany')}</h5>
                        <p>
                            <span className={s.howmany_wr}>
                                <Image
                                    src={'/assets/icons/hoursago.svg'}
                                    alt={'icon'}
                                    width={16}
                                    height={16}
                                />
                                <span>24</span>
                                {t('common:hourago')}
                            </span>
                            <span>{t('common:wehave')}</span>
                        </p>
                    </div>
                    <div className={`${s.table_el} ${s.table_b}`}>
                        <h5>$3,5</h5>
                        <p>{t('common:onezapmust')}</p>
                    </div>
                    <div className={`${s.table_el} ${s.table_b}`}>
                        <button type={'button'} onClick={fun(true)}>
                            <span>{t('common:opencontact')}</span>
                            <span>Ифтихор, 77</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
