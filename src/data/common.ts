export const dashboardMenu = [
    { id: 0, name: 'main', icon: 'timelapse' },
    { id: 1, name: 'providers', icon: 'person' },
    { id: 2, name: 'profile', icon: 'person' },
    { id: 3, name: 'balance', icon: 'payments' },
    { id: 4, name: 'statistics', icon: 'bar_chart' },
    { id: 5, name: 'products', icon: 'inventory_2' },
    { id: 6, name: 'upload_products', icon: 'save_alt' },
    { id: 7, name: 'incoming_requests', icon: 'inbox' },
    { id: 8, name: 'support', icon: 'headset_mic' },
];

export const overviewData = [
    {
        id: 1,
        heading: 'Баланс',
        body: '1,000 монет',
        footer: 'До 01.01.23',
        icon: 'payments',
    },
    {
        id: 2,
        heading: 'Переходов',
        body: '2,354',
        footer: '+123 Сегодня',
        icon: 'ads_click',
    },
    {
        id: 3,
        heading: 'Товаров',
        body: '13,213',
        footer: 'Обновление 3 дня назад',
        icon: 'inventory_2',
    },
    {
        id: 4,
        heading: 'Запросов',
        body: '503',
        footer: '+13 Сегодня',
        icon: 'inbox',
    },
];

export const balanceCardsData = [
    {
        id: 1,
        heading: '160.000 сум',
        body: '100 Монет',
        footer: '1400 сум за просмотр',
        icon: 'payments',
    },
    {
        id: 2,
        heading: '350.000 сум',
        body: '250 Монет',
        footer: '1400 сум за просмотр',
        icon: 'payments',
    },
    {
        id: 3,
        heading: '350.000 сум',
        body: '250 Монет',
        footer: '1400 сум за просмотр',
        icon: 'payments',
    },
    {
        id: 4,
        heading: '350.000 сум',
        body: '250 Монет',
        footer: '1400 сум за просмотр',
        icon: 'payments',
    },
];

export const linksData = [
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

export const balanceStatistics = [
    {
        id: 1,
        title: 'Монет',
        date: 'До 01.01.23',
        count: '1000',
    },
    {
        id: 2,
        title: 'Монет',
        date: 'До 01.01.23',
        count: '1000',
    },
];

export const statisticsData = [
    {
        id: 1,
        title: 'Позиций',
        date: 'Обновление 20.10.22',
        count: '10.120',
    },
    {
        id: 2,
        title: 'Переходов',
        date: 'За текущий месяц',
        count: '120',
    },
    {
        id: 3,
        title: 'Потрачено монет',
        date: 'За текущий месяц',
        count: '150',
    },
];

export const reports = {
    paid: [
        {
            id: 1,
            title: 'Ценовая политика',
            desc: 'В этом отчете мы предоставляем информацию о минимальной, максимальной, средней цене и цене медиане на все товары компании.',
            coins: '50',
        },
        {
            id: 2,
            title: 'Сравнение цен с конкурентами',
            desc: 'Данная статистика позволяет сравнить цены на запчасти из прайс-листов с ценами на запчасти из прайс-листов других компаний.',
            coins: '20',
        },
        {
            id: 3,
            title: 'Топ-500 по позициям в поиске',
            desc: 'В этой статистике мы предоставляем данные о самых популярных запчастях, основываясь на том, что больше всего ищут и покупают.',
            coins: '25',
        },
        {
            id: 4,
            title: 'Топ-100 по брендам',
            desc: 'Эта статистика предоставляет данные о самых популярных брендах в поисковой системе, из расчета того – что больше всего ищут и покупают.',
            coins: '30',
        },
    ],

    free: [
        {
            id: 1,
            title: 'Популярность позиций из прайс-листа',
            desc: 'Данная статистика позволяет посмотреть самые популярные запчасти из прайс-листа.',
            coins: '',
        },
    ],
};
