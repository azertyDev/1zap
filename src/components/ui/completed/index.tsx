import React, { FC } from 'react';

import s from './index.module.scss';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export const Completed: FC<{
    title: string;
    children: React.ReactNode;
    img: JSX.Element;
}> = ({ title, children, img }): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={s.comp}>
            <div className={s.img_wr}>
                <Image
                    src={'/assets/icons/done.svg'}
                    alt={'done'}
                    width={181}
                    height={124}
                />
                <div className={s.circle}>{img}</div>
            </div>

            <h4 className={s.title}>{t(`common:${title}`)}</h4>
            <div className={s.text}>{children}</div>
        </div>
    );
};
