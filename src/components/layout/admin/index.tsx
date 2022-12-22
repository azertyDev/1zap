import { FC } from 'react';
import { Icon } from 'src/components/ui/icon';
import { Logo } from 'src/components/ui/logo';
import { dashboardMenu } from 'src/data/common';
import s from './index.module.scss';

export const Layout: FC<{ children: React.ReactNode }> = ({
    children,
}): JSX.Element => {
    return (
        <div className={s.layout}>
            <div className={s.navbar}>
                <Logo />
                <div className={s.menu}>
                    <ul>
                        <li>Основные</li>
                        <p>Работа с профилем</p>
                        {dashboardMenu.profile.map((item) => {
                            return (
                                <li key={item.id}>
                                    <Icon name={item.icon} size="22" style="" />
                                    {item.name}
                                </li>
                            );
                        })}
                        <p>Работа с позициями</p>
                        {dashboardMenu.positions.map((item) => {
                            return <li key={item.id}>{item.name}</li>;
                        })}
                    </ul>
                </div>
            </div>
            <div className={s.content}>{children}</div>
        </div>
    );
};
