import { FC, PropsWithChildren } from 'react';
import { CellProps } from 'react-table';
import { Icon } from 'components/ui/icon';
import s from './index.module.scss';

interface ActionsBlockProps extends PropsWithChildren {
    cell: CellProps<any, any>;
}

export const ActionsBlock: FC<ActionsBlockProps> = ({ cell, children }) => {
    return (
        <div className={s.actionButtons}>
            {children}
            <span>
                <Icon name="more_horiz" size={20} />
            </span>
        </div>
    );
};
