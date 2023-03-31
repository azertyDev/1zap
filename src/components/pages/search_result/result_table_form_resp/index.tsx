import { FC } from 'react';

import s from './index.module.scss';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Icon } from 'components/ui/icon';

export const ResultTableFormResp: FC<{
    toggleBookDetail: (val: boolean) => () => void;
}> = ({ toggleBookDetail }): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={s.table_wr}>
            <div className={s.table}>
                <div className={s.titles_big_wr}>
                    <p className={s.titles_big}>PARTS-MALL</p>
                    <p className={s.titles_big}>PBA-001</p>
                </div>
                <div className={s.info_wr}>
                    <p className={s.titles_small}>1 млн</p>
                    <p className={s.titles_small}>177 {t('common:howmany')}</p>
                    <p className={s.titles_small}>{t('common:wehave')}</p>
                    <p className={`${s.titles_small} ${s.info_img}`}>
                        <Icon size={14} name={'autorenew'} color={'#0D0A19'} />
                        <span>24{t('common:hourago')}</span>
                    </p>
                </div>
                <p className={s.text}>{t('common:onezapmust')}</p>
                <p className={s.titles_small}>PBA001PMC_фильтр масляный!\ Mazda 323/3/626, Nissan Primera 1.3-2.2 89</p>

                <p className={s.text}>{t('common:onezapmust')}</p>
                <div className={s.order_wr}>
                    <p className={s.titles_big}>Ифтихор, 77</p>
                    <button type={'button'} onClick={toggleBookDetail(true)}>
                        {t('common:opencontact')}
                    </button>
                </div>
            </div>
        </div>
    );
};
