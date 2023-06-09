import Link from 'next/link';
import { ReactNode } from 'react';
import { Icon } from 'src/components/ui/icon';
import { IconsWrapper } from 'src/components/ui/icons_wrapper';
import s from './index.module.scss';
import { useTranslation } from 'next-i18next';

export const OverviewBlock = ({
    data,
    title,
    isBalance = false,
    setCoins,
}: {
    setCoins?: (val: number) => () => void;
    data: any;
    title?: ReactNode;
    isBalance?: boolean;
}) => {
    const { t } = useTranslation('dashboard');

    return (
        <div className={s.wrapper}>
            {title && <div className={s.title}>{title}</div>}
            <div className={s.overviews}>
                {!isBalance && (
                    <>
                        {data.map((overview: any) => {
                            return (
                                <Link href={overview.link} className={s.item} key={overview.id}>
                                    <div className={s.header}>
                                        <IconsWrapper size="big" variant="rounded" aria-label="icon">
                                            <Icon name={overview.icon} size={22} />
                                        </IconsWrapper>
                                        <span>{overview.heading}</span>
                                    </div>
                                    <div className={s.description}>{overview.body}</div>
                                    <div className={s.footer}>{overview.footer}</div>
                                </Link>
                            );
                        })}
                    </>
                )}

                {isBalance && setCoins && (
                    <>
                        {data.map((overview: any) => {
                            return (
                                <div className={s.item} key={overview.id}>
                                    <div className={s.header}>
                                        <IconsWrapper size="big" variant="rounded" aria-label="icon">
                                            <Icon name={overview.icon} size={22} />
                                        </IconsWrapper>
                                        <span>{overview.heading}</span>
                                    </div>
                                    <div className={s.description}>{overview.body}</div>
                                    <div className={`${s.footer} ${isBalance ? s.active : ''}`}>{overview.footer}</div>
                                    <button
                                        type={'button'}
                                        className={s.balance_button}
                                        onClick={setCoins(overview.id)}
                                    >
                                        {t('fill_balance')}
                                    </button>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
};
