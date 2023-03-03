import { FC } from 'react';
import { useRouter } from 'next/router';
import { Main } from './admin/sections/main';
import { Profile } from './admin/sections/profile';
import { Balance } from './admin/sections/balance';
import { Statistics } from './admin/sections/statistics';
import { Products } from './admin/sections/products';
import { Providers } from './admin/sections/providers';
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
            case `/dashboard/products`:
                return <Products />;
            case `/dashboard/providers`:
                return <Providers />;
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
