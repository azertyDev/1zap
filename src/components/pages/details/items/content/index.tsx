import s from './index.module.scss';

import React, { FC } from 'react';
import { IconsWrapper } from 'components/ui/icons_wrapper';
import { Icon } from 'components/ui/icon';

export const ContentDetailsCategories: FC<{
    children: React.ReactNode;
    title: string;
    handleBack?: (val: number | null) => () => void;
}> = ({ children, title, handleBack }): JSX.Element => {
    return (
        <div className={s.content}>
            <div className={s.title_btn_wr}>
                <h4 className={s.content_title}>{title}</h4>
                <div className={s.icon} onClick={handleBack ? handleBack(null) : undefined}>
                    <IconsWrapper size={'big'}>
                        <Icon size={22} name={'arrow_back'} />
                    </IconsWrapper>
                </div>
            </div>

            <div className={s.content_inner}>{children}</div>
        </div>
    );
};
