import { FC } from 'react';

import s from './index.module.scss';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export const NoResult: FC = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div className={s.no_result}>
            <div className={s.no_result_img}>
                <Image
                    src={'/assets/images/search/no_found_result.svg'}
                    alt={'no result'}
                    width={169}
                    height={158}
                    quality={100}
                />
            </div>

            <h3 className={s.title}>{t('common:noresult')}</h3>
            <p className={s.text}>{t('common:noresulttext')}</p>
        </div>
    );
};
