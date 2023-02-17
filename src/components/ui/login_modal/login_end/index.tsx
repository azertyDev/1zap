import React, { FC } from 'react';
import { Completed } from 'components/ui/completed';
import Image from 'next/image';
import { Icon } from 'components/ui/icon';
import { useTranslation } from 'next-i18next';
import { Button } from 'components/ui/button';

export const LoginEnd: FC<{
    emailVal: string;
}> = ({ emailVal }): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div>
            <Completed
                smallTitle
                title={'thanks'}
                img={<Icon size={25} name={'done'} />}
            >
                <p>{t('common:wesendemail', { email: emailVal })}</p>
            </Completed>
            <Button variant={"primary"}>{t('common:openemail')}</Button>
        </div>
    );
};
