import { FC } from 'react';
import { useRouter } from 'next/router';
import { Main } from './sections/main';
import { Profile } from './sections/profile';
import { Balance } from './sections/balance';
import { Statistics } from './sections/statistics';
import { Products } from './sections/products';
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
