import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { walletApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import s from 'components/pages/dashboard/cabinet/sections/balance/index.module.scss';
import { StatisticsBlock } from 'components/ui/dashboard/statistics_block';
import { FilterCalendar } from 'components/ui/dashboard/table/filterCalendar';
import { Table } from 'components/ui/dashboard/table';
import { Pagination } from 'components/ui/pagination/Pagination';
import { Heading } from 'components/ui/dashboard/heading';

export const ViewProviderBalance = () => {
    const { t } = useTranslation();
    const [data, setData] = useState<any>(null);

    const [filtringByDate, setFiltringByDate] = useState<null | string>(null);
    const [fullDate, setFullDate] = useState<null | string>(null);
    const [month, setMonth] = useState(new Date());

    const [walletInfo, setWalletInfo] = useState([]);

    const {
        query: { page, id },
    } = useRouter();

    const balanceStatistics = walletInfo.map((item: { id: number; expiredAt: string; coin: number }) => {
        return {
            id: item.id,
            title: t('dashboard:coinsBig'),
            date: t('dashboard:till', { till: item.expiredAt }),
            count: item.coin,
        };
    });

    useEffect(() => {
        (() => {
            walletApi
                .getProviderWalletInfoByAdmin(id as string)
                .then((res) => {
                    setWalletInfo(res);
                })
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, []);

    useEffect(() => {
        (() => {
            walletApi
                .getHistoryProviderByAdmin(
                    id as string,
                    page as string,
                    filtringByDate
                        ? filtringByDate === 'month'
                            ? dayjs(month).format('YYYY-MM')
                            : dayjs(fullDate).format('YYYY-MM-DD')
                        : null
                )
                .then((res) => setData(res))
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, [page, month, fullDate]);

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
            Cell: ({ cell }: any) => dayjs(cell.value).format('H:MM') as any,
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
            maxWidth: 100,
        },
        {
            Header: t('dashboard:info') as string,
            accessor: 'info',
            Cell: ({ cell }: any) => t(`dashboard:wallet_info.${cell.value.toLowerCase()}`),
            disableFilters: true,
            disableSortBy: false,
            minWidth: 220,
        },
    ];

    return (
        <div className={s.wrapper}>
            <Heading title={t(`dashboard:balance`)} desc={''} />
            <div>
                {walletInfo && (
                    <StatisticsBlock
                        data={balanceStatistics as any}
                        title={<h4>{t('dashboard:current_balance')}</h4>}
                    />
                )}
            </div>

            <h4 className={s.title}>{t('dashboard:history_balance')}</h4>
            {data && (
                <FilterCalendar
                    setFullDate={setFullDate}
                    fullDate={fullDate}
                    setMonth={setMonth}
                    month={month}
                    setFiltringByDate={setFiltringByDate}
                />
            )}

            {data?.data && <Table data={data?.data} columns={cols} isSecondType />}
            {data?.totalPages > 1 && <Pagination pageCount={data?.totalPages} />}
        </div>
    );
};
