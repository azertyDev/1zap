import s from './index.module.scss';

import {FC, useState} from 'react';
import Link from 'next/link';

import {useTranslation} from 'next-i18next';

import {Logo} from 'components/ui/logo';

import {Button} from "components/ui/button";
import {FirstFormVim} from "components/pages/request_vim/form_items/first_form";
import {SecondFormVim} from "components/pages/request_vim/form_items/second_form";

export const RequestVimComp: FC = (): JSX.Element => {
    const {t} = useTranslation();
    const [form, setForm] = useState(false);
    const [cancleBtn, setCancelBtn] = useState(true);

    return (
        <div className={s.wrapper}>
            <header className={s.header}>
                <Link href={'/'}>
                    <Logo/>
                </Link>
                {cancleBtn && (
                    <Link href={"/"}>
                        <Button variant={"disabled"}>{t('common:cancel')}</Button>
                    </Link>
                )}
            </header>

            <div>
                {!form ? (
                    <FirstFormVim fun={setForm}/>
                ) : (
                    <SecondFormVim fun={setCancelBtn}/>
                )}
            </div>
        </div>
    );
};
