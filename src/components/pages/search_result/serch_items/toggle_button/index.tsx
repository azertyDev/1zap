import { FC } from 'react';
import s from './index.module.scss';

import { useTranslation } from 'next-i18next';
import { Icon } from 'components/ui/icon';

export const ToggleButton: FC<{
    mapIsOpen: boolean;
    fun: (val: boolean) => () => void;
}> = ({ mapIsOpen, fun }): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div>
            {!mapIsOpen ? (
                <button className={s.btn_map} onClick={fun(true)}>
                    <Icon name={'map'} size={20} color={'#fff'} />

                    <p> {t('common:openMap')}</p>
                </button>
            ) : (
                <div className={s.btn_controls_inner}></div>
            )}
        </div>
    );
};
