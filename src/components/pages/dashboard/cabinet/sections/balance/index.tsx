import { OverviewBlock } from 'src/components/ui/dashboard/overview_block';
import { StatisticsBlock } from 'src/components/ui/dashboard/statistics_block';
import s from './index.module.scss';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';
import { Table } from 'components/ui/dashboard/table';
import { Pagination } from 'components/ui/pagination/Pagination';
import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { FilterCalendar } from 'components/ui/dashboard/table/filterCalendar';
import { IProviderStat } from 'types';
import { providerApi, walletApi } from 'src/utils/api';
import { useRouter } from 'next/router';

export const Balance = () => {
    const { t } = useTranslation();
    const [data, setData] = useState<any>(null);
    const {
        query: { page },
    } = useRouter();

    const [dataStat, setDataStat] = useState<IProviderStat | null>(null);
    useEffect(() => {
        (() => {
            providerApi
                .getProviderStatistic()
                .then((res) => setDataStat(res))
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, []);

    useEffect(() => {
        (() => {
            walletApi
                .getHistoryProvider(page as string)
                .then((res) => setData(res))
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, [page]);

    const handleSendBalance = useCallback((val: number) => {
        return () => {
            walletApi
                .addCoins({
                    info: 'wallet_up',
                    coin: val,
                })
                .then(() =>
                    toast.success(t('dashboard:balance_moderation'), {
                        duration: 4000,
                    })
                )
                .catch(() => toast.error(t('helpers:error_sending')));
        };
    }, []);

    const balanceStatistics = [
        {
            id: 1,
            title: t('dashboard:coins'),
            date: t('dashboard:till', { till: dataStat?.balance.date }),
            count: dataStat?.balance.balance,
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
            disableSortBy: false,
            disableFilters: true,
            maxWidth: 70,
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
            accessor: 'action',
            Cell: ({ cell }: any) => t(`dashboard:wallet_type.${cell.value}`),
            disableFilters: true,
            disableSortBy: false,
            minWidth: 200,
        },
        {
            Header: t('dashboard:cost') as string,
            accessor: 'amount',
            Cell: ({ cell }: any) => {
                return `${cell.value} ${t('dashboard:coins')}`;
            },
            disableFilters: true,
            disableSortBy: false,
        },
    ];

    return (
        <div className={s.wrapper}>
            <div>
                {dataStat && (
                    <StatisticsBlock
                        data={balanceStatistics as any}
                        title={<h4>{t('dashboard:current_balance')}</h4>}
                    />
                )}
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
            <FilterCalendar />
            {data?.data && <Table data={data?.data} columns={cols} isSecondType />}
            {data?.totalPages > 1 && <Pagination pageCount={data?.totalPages} />}
        </div>
    );
};
