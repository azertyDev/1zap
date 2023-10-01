export const dashboardMenu = [
    { id: 1, name: 'providers', icon: 'person', query: '?page=1&pageSec=1' },
    { id: 2, name: 'income', icon: 'inbox', query: '?page=1&pageSec=1' },
    { id: 3, name: 'promo', icon: 'label', query: '?page=1&pageSec=1' },
    { id: 4, name: 'vin-requests', icon: 'inbox', query: '?page=1' },
    { id:5, name: 'operations', icon: 'view_day', query: '?page=1' },
    { id: 6, name: 'center', icon: 'headset_mic' },
    // { id: 0, name: 'main', icon: 'timelapse' },
    // { id: 4, name: 'profile', icon: 'person' },
    // { id: 5, name: 'balance', icon: 'payments' },
    // { id: 6, name: 'statistics', icon: 'bar_chart' },
    // { id: 7, name: 'price-list', icon: 'inventory_2' },
    // { id: 8, name: 'upload_products', icon: 'save_alt' },
    // { id: 10, name: 'support', icon: 'headset_mic' },
];

export const cabinetMenu = [
    { id: 1, name: 'main', icon: 'timelapse' },
    { id: 2, name: 'balance', icon: 'payments', query: '?page=1' },
    { id: 3, name: 'promo', icon: 'label', query: '?page=1' },
    // { id: 4, name: 'statistics', icon: 'bar_chart' },
    { id: 5, name: 'price-list', icon: 'inventory_2', query: '?page=1' },
    { id:6, name: 'incoming_requests', icon: 'inbox', query: '?page=1' },
    // { id: Math.random(), name: 'support', icon: 'headset_mic' },
];

export const linksData = [
    {
        id: 2,
        link: '/cabinet/main/requisites',
        icon: 'account_balance',
        title: 'requisites',
        desc: 'req_and_doc',
    },
    {
        id: 1,
        link: '/cabinet/main/branches',
        icon: 'place',
        title: 'branches',
        desc: 'change_and_add',
    },
    {
        id: 3,
        link: '/cabinet/main/settings',
        icon: 'build',
        title: 'settings',
        desc: 'lang_password',
    },
    {
        id: 4,
        link: '/cabinet/balance?page=1',
        icon: 'monetization_on',
        title: 'account_balance',
        desc: 'info_fillup',
    },
    {
        id: 5,
        link: '/cabinet/price-list?page=1',
        icon: 'inventory_2',
        title: 'products',
        desc: 'edit_and_refresh',
    },
    {
        id: 6,
        link: '/cabinet/promo?page=1',
        icon: 'label',
        title: 'promo',
        desc: 'allocation_ad',
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
