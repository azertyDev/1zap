import { FC, ReactElement } from 'react';
import { ModalProps, Modal as ReactModal } from 'react-responsive-modal';
import s from './index.module.scss';

export const Modal: FC<ModalProps> = ({ children, ...rest }): ReactElement => {
    return <ReactModal {...rest}>{children}</ReactModal>;
};
