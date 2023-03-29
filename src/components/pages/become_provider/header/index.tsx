import s from './index.module.scss';

import Link from 'next/link';

import { Logo } from 'components/ui/logo';
import { Button } from 'components/ui/button';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

export const BecomeProviderHeader = (): JSX.Element => {
    const { t } = useTranslation();
    const { pathname, push } = useRouter();
    const [pathName] = useState(pathname.split('/'));

    return (
        <div>
            <header className={s.header}>
                <Link href={'/'}>
                    <Logo />
                </Link>
                <Link href={'/'} className={pathName.includes('final_step') ? s.final : ''}>
                    <Button variant={'disabled'}>{t('common:cancel')}</Button>
                </Link>
            </header>
        </div>
    );
};
