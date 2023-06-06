import s from './index.module.scss';
import { Button } from 'components/ui/button';
import { FC } from 'react';
import { FormikProps } from 'formik';
import { useTranslation } from 'next-i18next';

export const PromoSubmitInfo: FC<{
    formik: FormikProps<any>;
    info: { coin: number; discount: number; position: number };
}> = ({ formik, info }) => {
    const { t } = useTranslation();

    return (
        <div className={s.info_block}>
            <div>
                <p className={s.info_block_coin}>
                    <span>
                        {info.coin} {t('dashboard:coins')}
                    </span>{' '}
                    {t('dashboard:ad_period')}
                </p>
                <div className={s.info_block_details}>
                    <div>
                        <span>{t('dashboard:promo_position')}</span>
                        <span>{info.position}</span>
                    </div>
                    <div>
                        <span>{t('dashboard:discount_size')}</span>
                        <span>{info.discount}%</span>
                    </div>
                </div>
            </div>

            <div className={s.additional}>
                <span>{t('dashboard:promo_moderation')}</span>
                <Button
                    type="submit"
                    onClick={() => formik.submitForm()}
                    disabled={!(formik.isValid && formik.dirty)}
                    variant={!(formik.isValid && formik.dirty) ? 'disabled' : 'primary'}
                >
                    {t('dashboard:publish')}
                </Button>
            </div>
        </div>
    );
};
