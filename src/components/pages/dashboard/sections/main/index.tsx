import { shallow } from 'zustand/shallow';
import { useStore } from 'src/store/useStore';
import { linksData, overviewData } from 'src/data/common';
import { InfoLinks } from 'src/components/ui/dashboard/info_links';
import { OverviewBlock } from 'src/components/ui/dashboard/overview_block';
import s from './index.module.scss';

export const Main = () => {
    const { data, loading, error, login } = useStore((state) => state, shallow);

    console.log(data);

    return (
        <div className={s.wrapper}>
            {error && <div>{error}</div>}
            {loading && <div>Loading...</div>}
            <h1>
                С возвращением, User
                <span>Основная информация по вашему магазину</span>
            </h1>
            <button onClick={() => login('admin@mail.ru', 'password')}>
                Login user
            </button>

            <OverviewBlock data={overviewData} />

            <hr />

            <InfoLinks data={linksData} />
        </div>
    );
};
