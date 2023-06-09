import { OverviewBlock } from 'src/components/ui/dashboard/overview_block';
import { StatisticsBlock } from 'src/components/ui/dashboard/statistics_block';

import s from './index.module.scss';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';
import { ColumnFilter } from 'components/ui/dashboard/table/columnFilter';
import { Icon } from 'components/ui/icon';
import { Table } from 'components/ui/dashboard/table';
import { Pagination } from 'components/ui/pagination/Pagination';
import { useState } from 'react';
import dayjs from 'dayjs';
import { FilterCalendar } from 'components/ui/dashboard/table/filterCalendar';

export const Balance = () => {
    const { t } = useTranslation();
    const [data, setData] = useState<any>([
        {
            id: 1,
            type: 'added',
            createdAt: Date.now(),
            cost: 2,
            info: 'Хз',
        },
    ]);

    const handleSendBalance = (val: number) => {
        return () => {
            toast.success(t('dashboard:balance_moderation'), {
                duration: 4000,
            });
        };
    };

    const balanceStatistics = [
        {
            id: 1,
            title: t('dashboard:coins'),
            date: t('dashboard:till', { till: '01/01/23' }),
            count: '122',
        },
    ];
    const balanceCardsData = [
        {
            id: 100,
            heading: `160.000 ${t('common:sum')}`,
            body: `100 ${t('dashboard:coins')}`,
            footer: t('dashboard:price_for_view', { price: 1600 }),
            icon: 'payments',
        },
        {
            id: 250,
            heading: `350.000 ${t('common:sum')}`,
            body: `250 ${t('dashboard:coins')}`,
            footer: t('dashboard:price_for_view', { price: 1400 }),
            icon: 'payments',
        },
        {
            id: 500,
            heading: `600.000 ${t('common:sum')}`,
            body: `500 ${t('dashboard:coins')}`,
            footer: t('dashboard:price_for_view', { price: 1200 }),
            icon: 'payments',
        },
        {
            id: 1000,
            heading: `1.000.000 ${t('common:sum')}`,
            body: `1000 ${t('dashboard:coins')}`,
            footer: t('dashboard:price_for_view', { price: 1000 }),
            icon: 'payments',
        },
    ];

    const cols = [
        {
            Header: t('dashboard:date') as string,
            id: 'eventdate',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YY') as any,
            Filter: FilterCalendar,
            disableSortBy: false,
            maxWidth: 80,
        },
        {
            Header: t('dashboard:time') as string,
            id: 'eventtime',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('h:mm') as any,
            disableFilters: true,
            disableSortBy: false,
            maxWidth: 70,
        },
        {
            Header: t('dashboard:type') as string,
            accessor: 'type',
            Cell: ({ cell }: any) => t(`dashboard:balance_types.${cell.value}`),
            disableFilters: true,
            disableSortBy: false,
        },
        {
            Header: t('dashboard:cost') as string,
            accessor: 'cost',
            Cell: ({ cell }: any) =>
                cell.value > 1 ? `${cell.value} ${t(`dashboard:coins`)}` : `${cell.value} ${t(`dashboard:coin`)}`,
            disableFilters: true,
            disableSortBy: false,
        },
        {
            Header: t('dashboard:info') as string,
            accessor: 'info',
            Cell: ({ cell }: any) => cell.value,
            disableFilters: true,
            disableSortBy: false,
        },
    ];

    return (
        <div className={s.wrapper}>
            <div>
                <StatisticsBlock data={balanceStatistics} title={<h4>{t('dashboard:current_balance')}</h4>} />
            </div>

            <div className={s.overview}>
                <OverviewBlock
                    isBalance
                    setCoins={handleSendBalance}
                    data={balanceCardsData}
                    title={<h4>{t('dashboard:balanceFilling')}</h4>}
                />
            </div>

            <h4 className={s.title}>{t('dashboard:history_balance')}</h4>

            {data && <Table data={data} columns={cols} />}
            {/*{data?.totalPages > 1 && <Pagination pageCount={data.totalPages} />}*/}
        </div>
    );
};
