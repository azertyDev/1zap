import { FC } from 'react';
import { useRouter } from 'next/router';
import { Main } from './sections/main';
import { Profile } from './sections/profile';
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
