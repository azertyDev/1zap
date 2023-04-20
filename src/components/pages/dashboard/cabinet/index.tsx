import { FC } from 'react';
import { useRouter } from 'next/router';
import { Main } from './sections/main';
import { Profile } from './sections/profile';
import { Balance } from './sections/balance';
import { Statistics } from './sections/statistics';
import { PromoPage } from './sections/promo';
import { PriceList } from './sections/price_list';
import { VinRequests } from './sections/vin_request';
import { IncominRequests } from './sections/incoming_requests/vin_request';
import Header from 'src/components/ui/dashboard/header';
import BottomFooter from 'src/components/widgets/footer/bottom_footer';
import s from './index.module.scss';

interface PropsType extends FC {}

export default (props: PropsType): JSX.Element => {
    const { asPath, query } = useRouter();

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
            case `/cabinet/vin-requests`:
                return <VinRequests />;
            case `/cabinet/incoming_requests`:
                return <IncominRequests />;
            default:
                return 'Страница не найдена';
        }
    };

    return (
        <div className={s.wrapper}>
            <Header title={query.slug as string} />
            <main>{page()}</main>
            <BottomFooter className={s.footer} />
        </div>
    );
};
