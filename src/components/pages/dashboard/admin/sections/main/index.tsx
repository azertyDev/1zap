import { useStore } from 'src/store/useStore';
import { linksData, overviewData } from 'src/data/common';
import { InfoLinks } from 'src/components/ui/dashboard/info_links';
import { OverviewBlock } from 'src/components/ui/dashboard/overview_block';
import s from './index.module.scss';
import { Avatar } from 'src/components/ui/avatar';

export const Main = () => {
    const { userData } = useStore();

    return (
        <div className={s.wrapper}>
            <div className={s.info}>
                <Avatar src="/assets/images/avatar2.jpeg" size={114} alt="user-avatar" />
                <div className={s.info__block}>
                    <h3 className={s.info_username}>
                        {userData?.user.fullName}
                        <span>ID {userData?.user.id}</span>
                    </h3>
                    <h2 className={s.info_company}>Hyundai auto asia</h2>
                    {/* <h3 className={s.info_phone}>{userData?.user.phone}</h3> */}
                    <h3 className={s.info_phone}>+998332255195</h3>
                </div>
            </div>

            <OverviewBlock data={overviewData} />

            <hr />

            <InfoLinks data={linksData} />
        </div>
    );
};
