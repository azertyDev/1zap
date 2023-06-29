import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { ExchangeRate } from 'src/components/ui/exchange_rate';
import s from '../index.module.scss';
import { Language } from 'components/ui/language';
import { useRouter } from 'next/router';

const BottomFooter = (props: any) => {
    const { t } = useTranslation();

    return (
        <div className={props.className ?? s.footer_bot}>
            <div className={s.privacy}>
                <Link href={'#!'}>
                    <p>{t('footer:privacyPolicy')}</p>
                </Link>
                <Link href={'#!'}>{t('footer:offer')}</Link>
            </div>
            <p className={s.copy}>&copy; 2023 All rights reserved</p>
            <div className={s.controls}>
                {props.showLang && <Language />}
                <ExchangeRate />
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(BottomFooter), {
    ssr: false,
});
