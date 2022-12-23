import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Icon } from 'src/components/ui/icon';
import { Logo } from 'src/components/ui/logo';
import { dashboardMenu } from 'src/data/common';
import s from './index.module.scss';

const Navbar = (): JSX.Element => {
    const {
        query: { slug },
    } = useRouter();
    const { t } = useTranslation();

    return (
        <div className={s.wrapper}>
            <div className={s.logo_wrapper}>
                <Logo />
            </div>
            <div className={s.menu}>
                <ul>
                    <Link
                        href="/dashboard/main"
                        className={
                            slug === dashboardMenu[0].name ? s.active : ''
                        }
                    >
                        <li>
                            <Icon name="timelapse" size="22" />
                            {t('common:main')}
                        </li>
                    </Link>

                    <p>{t('common:profile_work')}</p>
                    {dashboardMenu.slice(1, 4).map((item) => {
                        return (
                            <Link
                                key={item.id}
                                href={`/dashboard/${item.name}`}
                                className={slug === item.name ? s.active : ''}
                            >
                                <li>
                                    <Icon name={item.icon} size="22" />
                                    {t(`common:${item.name}`)}
                                </li>
                            </Link>
                        );
                    })}
                    <p>{t('common:position_work')}</p>
                    {dashboardMenu.slice(4, 8).map((item) => {
                        return (
                            <Link
                                key={item.id}
                                href={`/dashboard/${item.name}`}
                                className={slug === item.name ? s.active : ''}
                            >
                                <li>
                                    <Icon name={item.icon} size="22" />
                                    {t(`common:${item.name}`)}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(Navbar), {
    ssr: false,
});
