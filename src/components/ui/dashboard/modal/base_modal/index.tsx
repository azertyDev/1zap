import React, { FC, ReactNode } from 'react';
import { ModalProps } from 'react-responsive-modal';
import s from './index.module.scss';
import { Icon } from 'components/ui/icon';

interface BaseModalProps extends ModalProps {
    headerContent: ReactNode;
}

export const BaseModal: FC<BaseModalProps> = ({ headerContent, children, open, onClose }) => {
    return (
        <div className={`${s.wr} ${open ? s.active : ''}`} id={'modal_id_wr'}>
            <div className={s.root}>
                <div className={s.header}>
                    {headerContent}
                    <div className={s.close} onClick={onClose}>
                        <Icon name={'close'} size={20} color={'#9A9EA7'} />
                    </div>
                </div>
                <div className={s.content}>{children}</div>
            </div>
        </div>
    );
};
