import s from './index.module.scss';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Icon } from 'components/ui/icon';
import { FC } from 'react';

export const CenterBreadCrumbs: FC<{ linkOne: string; linkTwo?: string }> = ({ linkOne, linkTwo }) => {
    const { t } = useTranslation();

    return (
        <div className={s.wr}>
            <h1 className={s.title}>Поиск и бранирование</h1>
            <div className={s.links_wr}>
                <Link href={'/center'} className={s.link}>
                    {t('footer:infoCenter')}
                </Link>
                <div className={s.icon}>
                    <Icon name={'chevron_right'} size={18} color={'rgba(255, 255, 255, 0.5)'} />
                </div>
                <Link href={'/center'} className={`${s.link_one} ${!linkTwo ? s.not_active : ''}`}>
                    {linkOne}
                </Link>
                {linkTwo && (
                    <div className={s.linkTwo_wr}>
                        <div className={s.icon}>
                            <Icon name={'chevron_right'} size={18} color={'red'} />
                        </div>
                        <Link href={'/center'} className={s.link}>
                            {linkTwo}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};
