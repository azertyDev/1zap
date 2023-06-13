import { FC } from 'react';
import { useRouter } from 'next/router';
import { Providers } from './sections/providers';
import { PromoPage } from './sections/promo';
import { VinRequests } from './sections/vin_request';
import s from './index.module.scss';
import { CenterPage } from 'components/pages/dashboard/admin/sections/center';
import { EditPromoForm } from 'components/pages/dashboard/admin/sections/promo/edit';
import { IncomePage } from 'components/pages/dashboard/admin/sections/income';
import { OperationsPage } from 'components/pages/dashboard/admin/sections/operations';

interface PropsType extends FC {}

export default (props: PropsType): JSX.Element => {
    const { asPath, query } = useRouter();

    const page = () => {
        switch (asPath) {
            case `/dashboard/providers`:
                return <Providers />;
            case `/dashboard/promo?page=${query.page}&pageSec=${query.pageSec}`:
                return <PromoPage />;
            case `/dashboard/vin-requests?page=${query.page}`:
                return <VinRequests query={'moderation'} />;
            case `/dashboard/center`:
                return <CenterPage />;
            case `/dashboard/income?page=${query.page}&pageSec=${query.pageSec}`:
                return <IncomePage />;
            case `/dashboard/operations?page=${query.page}`:
                return <OperationsPage />;
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
