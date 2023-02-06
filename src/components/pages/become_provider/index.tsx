import s from './index.module.scss';
import { FC, useState } from 'react';
import Link from 'next/link';

import { useTranslation } from 'next-i18next';

import { Logo } from 'components/ui/logo';
import { FirstFormProvider } from 'components/pages/become_provider/form_items/first_form_provider';
import { SecondFormProvider } from 'components/pages/become_provider/form_items/second_form_provider';

export const BecomeProviderComp: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const [form, setForm] = useState(false);
    const [cancleBtn, setCancelBtn] = useState(true);

    return (
        <div className={s.wrapper}>
            <header className={s.header}>
                <Link href={'/'}>
                    <Logo />
                </Link>
                {cancleBtn && (
                    <button type={'button'}>{t('common:cancel')}</button>
                )}
            </header>

            <div>
                {!form ? (
                    <FirstFormProvider fun={setForm} />
                ) : (
                    <SecondFormProvider fun={setCancelBtn} />
                )}
            </div>
        </div>
    );
};
