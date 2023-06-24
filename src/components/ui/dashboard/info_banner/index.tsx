import s from './index.module.scss';
import { Avatar } from 'components/ui/avatar';
import { FC } from 'react';
import { IProviderStat } from 'types';

export const InfoBanner: FC<{ data: IProviderStat }> = ({ data }) => {
    return (
        <div className={s.info}>
            <Avatar
                src={data?.image && data?.image.length > 0 ? data.image : '/assets/icons/person_2.svg'}
                size={114}
                alt="user-avatar"
            />
            {data && (
                <div className={s.info__block}>
                    <h3 className={s.info_username}>
                        {data.name}
                        <span>ID {data.providerId}</span>
                    </h3>
                    <h2 className={s.info_company}>{data.companyName}</h2>
                    <h3 className={s.info_phone}>{data?.phone}</h3>
                </div>
            )}
        </div>
    );
};
