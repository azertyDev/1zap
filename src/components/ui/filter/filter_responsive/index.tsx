import { Dispatch, FC, SetStateAction, useCallback } from 'react';

import s from './index.module.scss';
import { Icon } from 'components/ui/icon';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const filterItems = [];

export const FilterResponsive: FC<{
    btnText: string;
    isOpen: boolean;
    fun: Dispatch<SetStateAction<boolean>>;
}> = ({ btnText, isOpen, fun }): JSX.Element => {
    const { t } = useTranslation();

    const handleFilter = useCallback(() => {
        return fun((prev) => !prev);
    }, []);

    return (
        <div className={s.filter_wr}>
            <button
                className={s.btn_title}
                type={'button'}
                onClick={handleFilter}
            >
                {t(`common:${btnText}`)}
            </button>

            <div className={`${s.filter_content} ${isOpen ? s.active : ''}`}>
                <div className={s.filter_header}>
                    <div className={s.filter_header_left}>
                        <Icon size={20} name={'tune'} />
                        <p className={s.filter_text}>{t('common:filter')}</p>
                    </div>

                    <button
                        type={'button'}
                        className={s.cancel}
                        onClick={handleFilter}
                    >
                        {t('common:cancel')}
                    </button>
                </div>
                <ul className={s.filter_items}>
                    <li className={s.filter_item}>
                        <span>Способ оплаты</span>
                        <Image
                            src={'/assets/icons/arrow_filter.svg'}
                            alt={'arrow'}
                            width={12}
                            height={12}
                        />

                        <input
                            type={'checkbox'}
                            id={'subiteminput'}
                            className={s.subitem_input}
                        />

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
                                    <label htmlFor={'subiteminput'}>
                                        Способ оплаты
                                    </label>
                                </div>

                                <button
                                    type={'button'}
                                    className={s.cancel}
                                    onClick={handleFilter}
                                >
                                    {t('common:cancel')}
                                </button>
                            </li>
                            <li className={s.item_subitem}>
                                <input type={'checkbox'} />
                                <div className={s.item_subitem_img}>
                                    <Icon
                                        size={13}
                                        name={'done'}
                                        style={s.icon}
                                    />
                                </div>
                                <span>Наличными</span>
                            </li>
                        </ul>
                    </li>

                    <li className={s.filter_item}>
                        <span>Способ оплаты2</span>
                        <Image
                            src={'/assets/icons/arrow_filter.svg'}
                            alt={'arrow'}
                            width={12}
                            height={12}
                        />

                        <input
                            type={'checkbox'}
                            id={'subiteminput2'}
                            className={s.subitem_input}
                        />

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
                                    <label htmlFor={'subiteminput2'}>
                                        Способ оплаты2
                                    </label>
                                </div>

                                <button
                                    type={'button'}
                                    className={s.cancel}
                                    onClick={handleFilter}
                                >
                                    {t('common:cancel')}
                                </button>
                            </li>
                            <li className={s.item_subitem}>
                                <input type={'checkbox'} />
                                <div className={s.item_subitem_img}>
                                    <Icon
                                        size={13}
                                        name={'done'}
                                        style={s.icon}
                                    />
                                </div>
                                <span>Наличными 2</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};
