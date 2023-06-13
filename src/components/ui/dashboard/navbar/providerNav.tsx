import { WithT } from 'i18next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Icon } from 'src/components/ui/icon';
import { Logo } from 'src/components/ui/logo';
import { cabinetMenu } from 'src/data/common';
import { useStore } from 'src/store/useStore';
import s from './index.module.scss';

type NavbarProps = {} & WithT;

const Navbar: FC<NavbarProps> = ({ t }): JSX.Element => {
    const {
        query: { slug },
    } = useRouter();
    const { logout } = useStore();

    return (
        <div className={s.wrapper}>
            <Link href="/" className={s.logo_wrapper}>
                <Logo />
            </Link>
            <div className={s.menu}>
                <ul>
                    <Link href="/cabinet/main" className={slug === cabinetMenu[0].name ? s.active : ''}>
                        <li>
                            <Icon name="timelapse" size={22} />
                            {t('dashboard:main')}
                        </li>
                    </Link>

                    <p>{t('dashboard:profile_work')}</p>
                    {cabinetMenu.slice(1, 4).map((item) => {
                        return (
                            <Link
                                key={item.id}
                                href={`/cabinet/${item.name}${item.query ?? ''}`}
                                className={slug === item.name ? s.active : ''}
                            >
                                <li>
                                    <Icon name={item.icon} size={22} />
                                    {t(`dashboard:${item.name}`)}
                                </li>
                            </Link>
                        );
                    })}
                    <p>{t('common:position_work')}</p>
                    {cabinetMenu.slice(4, 15).map((item) => {
                        return (
                            <Link
                                key={item.id}
                                href={`/cabinet/${item.name}${item.query ?? ''}`}
                                className={slug === item.name ? s.active : ''}
                            >
                                <li>
                                    <Icon name={item.icon} size={22} />
                                    {t(`dashboard:${item.name}`)}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
                <button onClick={logout}>
                    <Icon name="logout" size={22} />
                    {t(`common:logout`)}
                </button>
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(Navbar), {
    ssr: false,
});
