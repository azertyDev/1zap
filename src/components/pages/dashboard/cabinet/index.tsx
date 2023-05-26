import { FC } from 'react';
import { useRouter } from 'next/router';
import { Main } from './sections/main';
import { Profile } from './sections/profile';
import { Balance } from './sections/balance';
import { Statistics } from './sections/statistics';
import { PromoPage } from './sections/promo';
import { PriceList } from './sections/price_list';
import { IncominRequests } from './sections/vin_request/new';
import s from './index.module.scss';
import { IncominRequestsAccepted } from 'components/pages/dashboard/cabinet/sections/vin_request/accepted';

interface PropsType extends FC {}

export default (props: PropsType): JSX.Element => {
    const { asPath } = useRouter();

    const page = () => {
        switch (asPath) {
            case '/cabinet/main':
                return <Main />;
            case `/cabinet/profile`:
                return <Profile />;
            case `/cabinet/balance`:
                return <Balance />;
            case `/cabinet/statistics`:
                return <Statistics />;
            case `/cabinet/price-list`:
                return <PriceList />;
            case `/cabinet/promo`:
                return <PromoPage />;
            case `/cabinet/incoming_requests`:
                return <IncominRequests />;
            case `/cabinet/incoming_requests?status=accepted`:
                return <IncominRequestsAccepted />;
            default:
                return 'Страница не найдена';
        }
    };

    return (
        <div className={s.wrapper}>
            <main>{page()}</main>
        </div>
    );
};
