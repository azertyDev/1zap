import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { ExchangeRate } from 'src/components/ui/exchange_rate';
import s from '../index.module.scss';
import { Language } from 'components/ui/language';

import { Cities } from 'src/components/ui/cities';
;

const BottomFooter = (props: any) => {
    const { t } = useTranslation();

    return (
        <div className={props.className ?? s.footer_bot}>
            <div className={s.privacy}>
                <a href={`/assets/files/offerta.doc`} download>
                    <p>{t('footer:privacyPolicy')}</p>
                </a>
                <a href={`/assets/files/offerta.doc`} download>{t('footer:offer')}</a>
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
