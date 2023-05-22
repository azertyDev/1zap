import { FC, PropsWithChildren } from 'react';
import { CellProps } from 'react-table';
import { Icon } from 'components/ui/icon';
import { Menu } from 'components/ui/modal/menu';
import s from './index.module.scss';

interface ActionsBlockProps extends PropsWithChildren {
    menu?: any;
    cell?: CellProps<any, any>;
}

export const ActionsBlock: FC<ActionsBlockProps> = ({ cell, children, menu }) => {
    return (
        <div className={s.actionButtons}>
            {children}
            {!!cell && (
                <Menu
                    button={
                        <span>
                            <Icon name="more_horiz" size={20} />
                        </span>
                    }
                >
                    <>{menu}</>
                </Menu>
            )}
        </div>
    );
};
