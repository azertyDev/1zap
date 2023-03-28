import { ReactNode } from 'react';
import { Icon } from 'src/components/ui/icon';
import { IconsWrapper } from 'src/components/ui/icons_wrapper';
import s from './index.module.scss';

export const OverviewBlock = ({ data, title }: { data: any; title?: ReactNode }) => {
    return (
        <div className={s.wrapper}>
            {title && <div className={s.title}>{title}</div>}
            <div className={s.overviews}>
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
                            <div className={s.footer}>{overview.footer}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
