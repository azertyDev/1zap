import { shallow } from 'zustand/shallow';
import { useStore } from 'src/store/useStore';
import { linksData, overviewData } from 'src/data/common';
import { InfoLinks } from 'src/components/ui/dashboard/info_links';
import { OverviewBlock } from 'src/components/ui/dashboard/overview_block';
import s from './index.module.scss';

export const Main = () => {
    const { loading, error, login, logout } = useStore(
        (state) => state,
        shallow
    );
    const { data } = useStore((state) => state, shallow);

    console.log('data: ', data);

    // useEffect(() => {
    //     const token = localStorage.getItem('bound-store');

    //     console.log('token: ', token);
    // }, []);

    // useEffect(() => {
    //     fetchModerators();
    // }, [fetchModerators]);

    return (
        <div className={s.wrapper}>
            {error ? <div>{error}</div> : loading && <div>Loading...</div>}
            <h1>
                С возвращением, {data?.user.fullName}
                <span>Основная информация по вашему магазину</span>
            </h1>
            <button onClick={() => login('admin@mail.ru', 'password')}>
                Login user
            </button>
            <button onClick={() => logout()}>Logout</button>

            <OverviewBlock data={overviewData} />

            <hr />

            <InfoLinks data={linksData} />
        </div>
    );
};


