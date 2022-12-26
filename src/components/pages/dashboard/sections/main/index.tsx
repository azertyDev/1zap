import Link from 'next/link';
import { Icon } from 'src/components/ui/icon';
import { IconsWrapper } from 'src/components/ui/icons_wrapper';
import s from './index.module.scss';

const overviewData = [
    {
        id: 1,
        title: 'Баланс',
        text: '1,000 монет',
        upload: 'До 01.01.23',
        icon: 'payments',
    },
    {
        id: 2,
        title: 'Переходов',
        text: '2,354',
        upload: '+123 Сегодня',
        icon: 'ads_click',
    },
    {
        id: 3,
        title: 'Товаров',
        text: '13,213',
        upload: 'Обновление 3 дня назад',
        icon: 'inventory_2',
    },
    {
        id: 4,
        title: 'Запросов',
        text: '503',
        upload: '+13 Сегодня',
        icon: 'inbox',
    },
];

const linksData = [
    {
        id: 1,
        link: '#',
        icon: 'person',
        title: 'Общая информация',
        desc: 'Контактные данные, адреса',
    },
    {
        id: 2,
        link: '#',
        icon: 'account_balance',
        title: 'Реквизиты',
        desc: 'Обновление реквизитов',
    },
    {
        id: 3,
        link: '#',
        icon: 'person',
        title: 'Глобальные настройки',
        desc: 'Валюта , язык и пароль',
    },
    {
        id: 4,
        link: '#',
        icon: 'person',
        title: 'Баланс аккаунта',
        desc: 'Информация и пополнение',
    },
    {
        id: 5,
        link: '#',
        icon: 'person',
        title: 'Уведомления',
        desc: 'Ваши уведомления',
    },
];

export const Main = () => {
    return (
        <div className={s.wrapper}>
            <h1>
                С возвращением, User
                <span>Основная информация по вашему магазину</span>
            </h1>

            <div className={s.overview}>
                {overviewData.map((overview) => {
                    return (
                        <div className={s.item} key={overview.id}>
                            <div className={s.header}>
                                <IconsWrapper style={s.icon_wrapper}>
                                    <Icon name={overview.icon} size="22" />
                                </IconsWrapper>
                                <span>{overview.title}</span>
                            </div>
                            <div className={s.description}>{overview.text}</div>
                            <div className={s.footer}>{overview.upload}</div>
                        </div>
                    );
                })}
            </div>

            <hr />

            <div className={s.links}>
                {linksData.map(({ id, link, desc, title, icon }) => (
                    <Link href={link} key={id}>
                        <IconsWrapper style={s.icon_wrapper}>
                            <Icon name={icon} size="22" />
                        </IconsWrapper>
                        <div>
                            <p>{title}</p>
                            <span>{desc}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
