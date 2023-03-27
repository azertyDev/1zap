import { FC, ReactElement } from 'react';
import { Menu as ReactMenu } from '@szhsin/react-menu';
import s from './index.module.scss';

export const Menu: FC<any> = ({ button, children, ...rest }): ReactElement => {
    return (
        <ReactMenu
            transition
            menuButton={button}
            direction="bottom"
            align="center"
            position="anchor"
            viewScroll="auto"
            arrow={false}
            // offsetX={-20}
            offsetY={10}
            className={s.root}
        >
            {children}
        </ReactMenu>
    );
};
