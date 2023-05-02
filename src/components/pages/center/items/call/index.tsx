import s from './index.module.scss';
import { useTranslation } from 'next-i18next';
import { Button } from 'components/ui/button';

export const CenterCall = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={s.wr}>
            <div className={s.content}>
                <h5 className={s.title}>{t('center:cant_find')}</h5>
                <p className={s.text}>{t('center:connect_us')}</p>
            </div>
            <Button variant={'primary'}>{t('center:connect')}</Button>
        </div>
    );
};
