import { FC } from 'react';

import { Completed } from 'components/ui/completed';
import { Icon } from 'components/ui/icon';
import { Button } from 'components/ui/button';
import { useTranslation } from 'next-i18next';

import Link from 'next/link';

import s from './index.module.scss';
import { BecomeProviderHeader } from 'components/pages/become_provider/header';

export const BecomeProviderCompFinal: FC = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div>
            <BecomeProviderHeader />
            <div className={s.wr}>
                <Completed title={'requestSend'} img={<Icon size={28} name={'done'} />}>
                    <p>{t('common:weWillConnect')}</p>
                </Completed>
                <Link href={'/'}>
                    <Button variant={'primary'} fullWidth>
                        {t('common:returnHone')}
                    </Button>
                </Link>
            </div>
        </div>
    );
};
