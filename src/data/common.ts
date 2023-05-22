export const dashboardMenu = [
    { id: Math.random(), name: 'providers', icon: 'person' },
    { id: Math.random(), name: 'income', icon: 'inbox' },
    { id: Math.random(), name: 'promo', icon: 'label' },
    { id: Math.random(), name: 'vin-requests', icon: 'inbox' },
    { id: Math.random(), name: 'operations', icon: 'view_day' },
    { id: Math.random(), name: 'center', icon: 'view_day' },
    // { id: 0, name: 'main', icon: 'timelapse' },
    // { id: 4, name: 'profile', icon: 'person' },
    // { id: 5, name: 'balance', icon: 'payments' },
    // { id: 6, name: 'statistics', icon: 'bar_chart' },
    // { id: 7, name: 'price-list', icon: 'inventory_2' },
    // { id: 8, name: 'upload_products', icon: 'save_alt' },
    // { id: 10, name: 'support', icon: 'headset_mic' },
];

export const cabinetMenu = [
    { id: Math.random(), name: 'main', icon: 'timelapse' },
    { id: Math.random(), name: 'balance', icon: 'payments' },
    { id: Math.random(), name: 'promo', icon: 'label' },
    { id: Math.random(), name: 'statistics', icon: 'bar_chart' },
    { id: Math.random(), name: 'price-list', icon: 'inventory_2' },
    { id: Math.random(), name: 'incoming_requests', icon: 'inbox' },
    { id: Math.random(), name: 'support', icon: 'headset_mic' },
];

export const linksData = [
    {
        id: 2,
        link: '/cabinet/main/requisites',
        icon: 'account_balance',
        title: 'requisites',
        desc: 'Реквизиты и документы',
    },
    {
        id: 1,
        link: '/cabinet/main/branches',
        icon: 'place',
        title: 'branches',
        desc: 'Изменить и добавить',
    },
    {
        id: 3,
        link: '/cabinet/main/settings',
        icon: 'build',
        title: 'settings',
        desc: 'Язык, пароль и уведомления',
    },
    {
        id: 4,
        link: '/cabinet/main/balance',
        icon: 'monetization_on',
        title: 'account_balance',
        desc: 'Информация и пополнение',
    },
    {
        id: 5,
        link: '/cabinet/main/products',
        icon: 'inventory_2',
        title: 'products',
        desc: 'Редактирование и обновление',
    },
    {
        id: 6,
        link: '/cabinet/main/promo',
        icon: 'label',
        title: 'promo',
        desc: 'Размещенные объявления',
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
