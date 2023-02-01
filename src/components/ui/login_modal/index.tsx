import React, { FC, useState } from 'react';

import s from './index.module.scss';
import { useTranslation } from 'next-i18next';

import { Icon } from 'components/ui/icon';
import { Login } from 'components/ui/login_modal/login';
import { ForgotPassword } from 'components/ui/login_modal/forgotPassword';

import Link from 'next/link';
import { useStepOrder } from 'src/hooks/common/useStepOrder';

export const LoginModal: FC<{ fun: (val: boolean) => () => void }> = ({
    fun,
}): JSX.Element => {
    const { t } = useTranslation();
    const { order, handleOrder } = useStepOrder();

    const handleLoginClose = () => {
        document.addEventListener('click', (ev: any) => {
            if (ev?.target?.id === 'login_wr') {
                fun(false)();
            }
        });
    };

    return (
        <div className={s.login_wr} id={'login_wr'} onClick={handleLoginClose}>
            <div className={s.login_inner}>
                <div className={s.header}>
                    <p className={s.header_title}>
                        {order === 1
                            ? t('common:enterClient')
                            : t('common:fixPassword')}
                    </p>

                    <div onClick={fun(false)}>
                        <Icon size={19} name={'close'} />
                    </div>
                </div>
                <div>
                    {order === 1 && <Login fun={handleOrder} />}
                    {order === 2 && <ForgotPassword />}
                </div>
                {order === 1 && (
                    <div className={s.become_parther_wr}>
                        <p>{t('common:noaccout')}</p>
                        <Link href={'/become_provider'} onClick={fun(false)}>
                            {t('footer:becomeSupplier')}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};
