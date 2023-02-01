import { Icon } from 'src/components/ui/icon';
import { IconsWrapper } from 'src/components/ui/icons_wrapper';
import s from './index.module.scss';

export const OverviewBlock = ({ data }: { data: any }) => {
    return (
        <div className={s.wrapper}>
            {data.map((overview: any) => {
                return (
                    <div className={s.item} key={overview.id}>
                        <div className={s.header}>
                            <IconsWrapper style={s.icon_wrapper}>
                                <Icon name={overview.icon} size="22" />
                            </IconsWrapper>
                            <span>{overview.heading}</span>
                        </div>
                        <div className={s.description}>{overview.body}</div>
                        <div className={s.footer}>{overview.footer}</div>
                    </div>
                );
            })}
        </div>
    );
};
