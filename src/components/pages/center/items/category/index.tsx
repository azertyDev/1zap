import s from './index.module.scss';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FC } from 'react';

export const CenterCategory: FC<{ links: { text: string; id: number }[] }> = ({ links }) => {
    const { t } = useTranslation();

    const {
        query: { id },
    } = useRouter();

    return (
        <div className={s.wr}>
            <div>
                <p className={s.left_menu_title}>Поиск и бронирование</p>
                <ul className={s.left_menu_list}>
                    <li>
                        <Link href={'/center'}>Основы поиска</Link>
                    </li>
                    <li>
                        <Link href={'/center'}>Поиск на карте</Link>
                    </li>
                </ul>
            </div>
            <div className={s.right_menu}>
                <h4>{t('center:main_theme')}</h4>

                {links.map((item) => {
                    return (
                        <Link
                            key={item.id}
                            href={`/center/category/${item.id}`}
                            className={(id as any) == item.id ? s.active : ''}
                        >
                            {t(`center:${item.text}`)}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
