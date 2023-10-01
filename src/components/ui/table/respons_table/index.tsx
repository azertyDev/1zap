import s from './index.module.scss';
import Image from 'next/image';
import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { Icon } from 'components/ui/icon';
import { IconsWrapper } from 'components/ui/icons_wrapper';
import { useOpenCloseWithVal } from 'src/hooks/common/useOpenCloseWithVal';
import Link from 'next/link';
import { IProductGroup } from 'types';
import { formatNumber } from 'src/helpers/formatNumber';
import { useStore } from 'src/store/useStore';

export const ResponsTable: FC<{ item: IProductGroup; img: string; isTire?: boolean }> = ({
    item,
    img,
    isTire,
}): JSX.Element => {
    const { t } = useTranslation();
    const { handleOpenClose, openClose } = useOpenCloseWithVal();
    const { currency } = useStore((state) => state);
    return (
        <div className={s.table} key={item.id}>
            <div className={s.item}>
                <h5 className={s.title_item}>{item.manufacturer}</h5>
                <h5>{item.uniqNumber}</h5>
            </div>

            {isTire ? (
                <div className={s.property_wr}>
                    <h5>
                        {item.property[0].value}/{item.property[1].value} {item.property[2].value}
                    </h5>
                    <div className={s.circle}></div>
                    <p>{item.property[3].value}</p>
                </div>
            ) : (
                <div className={s.property_wr}>
                    {item.property.map((prop, i) => (
                        <div key={prop.value + i} className={s.property_items}>
                            <p>{prop.value}</p>
                            <div className={s.circle}></div>
                        </div>
                    ))}
                </div>
            )}

            <div className={`${s.item} ${s.last_item}`}>
                <div>
                    <p className={s.item_text}>
                        {currency === 'usd'
                            ? `$${item.usd.priceFrom}`
                            : `${formatNumber(item.sum.priceFrom)} ${t('common:sum')}`}
                    </p>
                    <div className={s.circle}></div>
                    <p>
                        {item.availability} {t('common:offers')}
                    </p>
                </div>

                <Link href={`/search_result?oem=${item.uniqNumber}&client=individual`}>
                    <button type={'button'} className={s.show_btn}>
                        {t('common:show')}
                    </button>
                </Link>
            </div>

            <button type={'button'} className={s.img_toggle} onClick={handleOpenClose(true)}>
                <Icon size={16} name={'image'} color={'#fff'} />
            </button>

            <div className={`${s.img_wr} ${openClose ? s.active : ''}`}>
                <div className={s.icon_close} onClick={handleOpenClose(false)}>
                    <IconsWrapper>
                        <Icon size={14} name={'close'} />
                    </IconsWrapper>
                </div>

                <Image src={img} alt={'image'} width={80} height={70} quality={100} />
            </div>
        </div>
    );
};
