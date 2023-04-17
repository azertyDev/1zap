import { FC } from 'react';

import s from './index.module.scss';
import { Icon } from 'components/ui/icon';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { Button } from 'components/ui/button';

import { useFilterRespons } from 'src/hooks/common/useFilterRespons';

export const FilterResponsive: FC<{
    btnText: string;
    isOpen: boolean;
    toggleFilter: (val: boolean) => () => void;
    data: { [val: string]: { value: string; label: string }[] };
    isTranslated?: boolean;
}> = ({ btnText, isOpen, toggleFilter, data, isTranslated }): JSX.Element => {
    const { t } = useTranslation();
    const { handleSubmitFilter, handleFilter, filterVal } = useFilterRespons(toggleFilter);

    return (
        <div className={s.filter_wr}>
            <button className={s.btn_title} type={'button'} onClick={toggleFilter(true)}>
                {t(`common:${btnText}`)}
            </button>

            <div className={`${s.filter_content} ${isOpen ? s.active : ''}`}>
                <div className={s.filter_header}>
                    <div className={s.filter_header_left}>
                        <Icon size={20} name={'tune'} />
                        <p>{t('common:filter')}</p>
                    </div>

                    <button type={'button'} className={s.cancel} onClick={toggleFilter(false)}>
                        {t('common:cancel')}
                    </button>
                </div>
                <ul className={s.filter_items}>
                    {data &&
                        Object.entries(data).map((item) => {
                            return (
                                <li className={s.filter_item} key={item[0]}>
                                    <span>{t(`common:selects.${item[0]}`)}</span>
                                    <Image
                                        src={'/assets/icons/arrow_filter.svg'}
                                        alt={'arrow'}
                                        width={12}
                                        height={12}
                                    />

                                    <input type={'checkbox'} id={item[0]} className={s.subitem_input} />

                                    <ul className={s.item_subitems} id={'subitem'}>
                                        <li className={s.item_subitem_header}>
                                            <div className={s.item_subitem_header_arr}>
                                                <svg
                                                    width="7"
                                                    height="10"
                                                    viewBox="0 0 7 10"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.32031 0L6.32031 5L1.32031 10L0.148438 8.82812L3.97656 5L0.148438 1.17188L1.32031 0Z"
                                                        fill="#0D0A19"
                                                    />
                                                </svg>
                                                <label htmlFor={item[0]}>{t(`common:selects.${item[0]}`)}</label>
                                            </div>

                                            <button type={'button'} className={s.cancel} onClick={toggleFilter(false)}>
                                                {t('common:cancel')}
                                            </button>
                                        </li>

                                        {item[1].map((subitem) => {
                                            return (
                                                <li className={s.item_subitem} key={subitem.value}>
                                                    <input
                                                        type={'radio'}
                                                        onChange={handleFilter({
                                                            [item[0]]: subitem.value,
                                                        })}
                                                        checked={filterVal[item[0]] === subitem.value}
                                                        name={item[0]}
                                                    />
                                                    <div className={s.item_subitem_img}>
                                                        <Icon size={13} name={'done'} style={s.icon} />
                                                    </div>
                                                    <span>
                                                        {isTranslated
                                                            ? t(`common:selects.${subitem.label}`)
                                                            : subitem.label}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            );
                        })}
                </ul>
                <div className={s.submit_btn}>
                    <Button variant={'primary'} type={'button'} onClick={handleSubmitFilter} fullWidth>
                        Применить
                    </Button>
                </div>
            </div>
        </div>
    );
};
