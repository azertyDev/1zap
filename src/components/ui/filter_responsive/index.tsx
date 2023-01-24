import { FC } from 'react';

import s from './index.module.scss';
import { Icon } from 'components/ui/icon';
import { useTranslation } from 'next-i18next';

export const FilterResponsive: FC<{ btnText: string }> = ({
    btnText,
}): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div className={s.filter_wr}>
            <button className={s.btn_title} type={'button'}>
                {t(`common:${btnText}`)}
            </button>

            <div className={s.filter_content}>
                <div className={s.filter_header}>
                    <div className={s.filter_header_left}>
                        <Icon size={20} name={'tune'} />
                        <p className={s.filter_text}>{t('common:filter')}</p>
                    </div>

                    <button type={'button'} className={s.cancel}>
                        {t('common:cancel')}
                    </button>
                </div>
            </div>
        </div>
    );
};
