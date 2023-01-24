import React, { Dispatch, FC, SetStateAction } from 'react';
import s from './index.module.scss';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export const ToggleButton: FC<{
    mapIsOpen: boolean;
    fun: Dispatch<SetStateAction<boolean>>;
}> = ({ mapIsOpen, fun }): JSX.Element => {
    const { t } = useTranslation();

    const handleOpen = () => {
        return fun((prev) => !prev);
    };

    return (
        <button className={s.btn_map} onClick={handleOpen}>
            {mapIsOpen ? (
                <Image
                    src={'/assets/icons/search.svg'}
                    alt={'map'}
                    width={15}
                    height={15}
                />
            ) : (
                <Image
                    src={'/assets/images/search/mini_map.svg'}
                    alt={'map'}
                    width={18}
                    height={21}
                />
            )}

            <p>{mapIsOpen ? t('common:openSearch') : t('common:openMap')}</p>
        </button>
    );
};
