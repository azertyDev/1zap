import { FC } from 'react';

import { RequestVimHeader } from 'components/pages/request_vim/header';
import { Completed } from 'components/ui/completed';
import { Icon } from 'components/ui/icon';
import { Button } from 'components/ui/button';
import { useTranslation } from 'next-i18next';

import Link from 'next/link';

import s from './index.module.scss';

export const RequestVimCompFinal: FC = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div style={{ position: 'relative' }}>
            <RequestVimHeader />
            <div className={s.wr}>
                <Completed
                    title={'requestSend'}
                    img={<Icon size={20} name={'check'} />}
                >
                    {t('common:searchRequest')}
                </Completed>
                <Link href={'/'}>
                    <Button variant={'primary'}>
                        {t('common:returnHone')}
                    </Button>
                </Link>
            </div>
        </div>
    );
};
