import { FC, useEffect, useState } from 'react';
import { walletApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';
import { Table } from 'components/ui/dashboard/table';
import { ActionsBlock } from 'components/ui/dashboard/table/ActionsBlock';
import { Button } from 'components/ui/button';
import { Pagination } from 'components/ui/pagination/Pagination';
import { useRouter } from 'next/router';
import { FilterCalendar } from 'components/ui/dashboard/table/filterCalendar';
import s from './index.module.scss';

export const OperationsPage: FC = () => {
    const [activeData, setActiveData] = useState<any>(null);
    const { t } = useTranslation();

    const [filtringByDate, setFiltringByDate] = useState<null | string>(null);
    const [fullDate, setFullDate] = useState<null | string>(null);
    const [month, setMonth] = useState(new Date());

    const {
        query: { page },
    } = useRouter();

    useEffect(() => {
        (() => {
            walletApi
                .getHistoryAdmin(
                    page as string,
                    filtringByDate
                        ? filtringByDate === 'month'
                            ? dayjs(month).format('YYYY-MM')
                            : dayjs(fullDate).format('YYYY-MM-DD')
                        : null
                )
                .then((res) => setActiveData(res))
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, [page, fullDate, month]);

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
            Header: t('dashboard:provider') as string,
            accessor: 'companyName',
            disableFilters: true,
            disableSortBy: false,
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
        {
            Header: t('dashboard:info') as string,
            accessor: 'info',
            Cell: ({ cell }: any) => t(`dashboard:wallet_info.${cell.value.toLowerCase()}`),
            disableFilters: true,
            disableSortBy: false,
            minWidth: 200,
        },
        {
            Header: t('dashboard:action'),
            disableFilters: true,
            disableSortBy: true,
            maxWidth: 120,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <Button variant={'disabled'}>{t('dashboard:in_detail')}</Button>
                    </ActionsBlock>
                );
            },
        },
    ];

    return (
        <div>
            <h4 className={s.titles}>{t('dashboard:history_last_oper')}</h4>
            <FilterCalendar
                setFullDate={setFullDate}
                fullDate={fullDate}
                setMonth={setMonth}
                month={month}
                setFiltringByDate={setFiltringByDate}
            />
            {activeData?.data && <Table data={activeData?.data} columns={cols} isSecondType />}
            {activeData?.totalPages > 1 && <Pagination pageCount={activeData?.totalPages} />}
        </div>
    );
};
