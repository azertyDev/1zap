import { FC } from 'react';
import { useRouter } from 'next/router';
import { Main } from './admin/sections/main';
import { Profile } from './admin/sections/profile';
import { Balance } from './admin/sections/balance';
import { Statistics } from './admin/sections/statistics';
import { Providers } from './admin/sections/providers';
import { PromoPage } from './admin/sections/promo';
import { PriceList } from './admin/sections/price_list';
import Header from 'src/components/ui/dashboard/header';
import BottomFooter from 'src/components/widgets/footer/bottom_footer';
import s from './index.module.scss';

interface PropsType extends FC {}

export default (props: PropsType): JSX.Element => {
    const { asPath, query } = useRouter();

    const page = () => {
        switch (asPath) {
            case '/dashboard/main':
                return <Main />;
            case `/dashboard/profile`:
                return <Profile />;
            case `/dashboard/balance`:
                return <Balance />;
            case `/dashboard/statistics`:
                return <Statistics />;
            case `/dashboard/price-list`:
                return <PriceList />;
            case `/dashboard/providers`:
                return <Providers />;
            case `/dashboard/promo`:
                return <PromoPage />;
            default:
                return 'Page not found';
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
