import React, { FC, ReactNode } from 'react';
import { ModalProps } from 'react-responsive-modal';
import { Modal } from 'src/components/ui/modal';
import s from './index.module.scss';

interface BaseModalProps extends ModalProps {
    headerContent: ReactNode;
}

export const BaseModal: FC<BaseModalProps> = ({ headerContent, children, ...rest }) => {
    return (
        <Modal classNames={{ modal: s.root }} {...rest}>
            <div className={s.header}>{headerContent}</div>
            <div className={s.content}>{children}</div>
        </Modal>
    );
};
