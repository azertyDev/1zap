import { FC } from 'react';
import { useRouter } from 'next/router';
import { Providers } from './sections/providers';
import { PromoPage } from './sections/promo';
import { VinRequests } from './sections/vin_request';
import s from './index.module.scss';

interface PropsType extends FC {}

export default (props: PropsType): JSX.Element => {
    const { asPath, query } = useRouter();

    const page = () => {
        switch (asPath) {
            case `/dashboard/providers`:
                return <Providers />;
            case `/dashboard/promo`:
                return <PromoPage />;
            case `/dashboard/vin-requests`:
                return <VinRequests />;
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
