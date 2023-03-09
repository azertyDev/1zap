import s from './index.module.scss';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { Icon } from 'components/ui/icon';
import { IconsWrapper } from 'components/ui/icons_wrapper';
import { useOpenCloseWithVal } from 'src/hooks/common/useOpenCloseWithVal';

export const ResponsTable = (): JSX.Element => {
    const { t } = useTranslation();
    const { handleOpenClose, openClose } = useOpenCloseWithVal();

    return (
        <div className={s.table}>
            <div className={s.item}>
                <h5 className={s.title_item}>GM</h5>
                <h5>31232131</h5>
            </div>
            <div className={s.item}>
                <p className={s.item_text}>5W-30</p>
                <p className={s.item_text}>Синтетическое </p>
                <p>5л</p>
            </div>
            <div className={s.item}>
                <p>POLYMERIUM XPRO1 5W30 C3 DEXOS2 4L</p>
            </div>
            <div className={`${s.item} ${s.last_item}`}>
                <div>
                    <p className={s.item_text}>От $19</p>
                    <p>44 предложения</p>
                </div>

                <button type={'button'} className={s.show_btn}>
                    {t('common:show')}
                </button>
            </div>

            <button
                type={'button'}
                className={s.img_toggle}
                onClick={handleOpenClose(true)}
            >
                <Icon size={16} name={'image'} color={'#fff'} />
            </button>

            <div className={`${s.img_wr} ${openClose ? s.active : ''}`}>
                <div className={s.icon_close} onClick={handleOpenClose(false)}>
                    <IconsWrapper>
                        <Icon size={14} name={'close'} />
                    </IconsWrapper>
                </div>
                <Image
                    src={
                        'https://images.unsplash.com/photo-1676296825236-8c06ac83938b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80'
                    }
                    alt={'oil'}
                    width={125}
                    height={125}
                />
            </div>
        </div>
    );
};
