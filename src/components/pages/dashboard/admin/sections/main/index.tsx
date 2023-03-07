import { useStore } from 'src/store/useStore';
import { linksData, overviewData } from 'src/data/common';
import { InfoLinks } from 'src/components/ui/dashboard/info_links';
import { OverviewBlock } from 'src/components/ui/dashboard/overview_block';
import s from './index.module.scss';

export const Main = () => {
    const { data } = useStore();

    return (
        <div className={s.wrapper}>
            <h1>
                С возвращением, {data?.user.fullName}
                <span>Основная информация по вашему магазину</span>
            </h1>

            <OverviewBlock data={overviewData} />

            <hr />

            <InfoLinks data={linksData} />
        </div>
    );
};
