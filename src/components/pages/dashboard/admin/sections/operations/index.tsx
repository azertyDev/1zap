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
import { useSortDataAdminProvider } from 'src/hooks/common/useSortDataAdminProvider';

export const OperationsPage: FC = () => {
    const [activeData, setActiveData] = useState<any>(null);
    const { t } = useTranslation();
    const [filtringByDate, setFiltringByDate] = useState<null | string>(null);
    const [fullDate, setFullDate] = useState<null | string>(null);
    const [month, setMonth] = useState(new Date());
    const { sortBy, sortType, handleSortProducts } = useSortDataAdminProvider();

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
                        : null,
                    sortType,
                    sortBy
                )
                .then((res) => setActiveData(res))
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, [page, fullDate, month, sortBy, sortType]);

    const cols = [
        {
            Header: t('dashboard:date') as string,
            id: 'eventdate',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YY') as any,
            maxWidth: 70,
            disableFilters: true,
            disableSortBy: true,
            showSort: true,
            typeProperty: 'created_at',
        },
        {
            Header: t('dashboard:time') as string,
            id: 'eventtime',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('H:MM') as any,
            disableFilters: true,
            disableSortBy: true,
            showSort: true,
            maxWidth: 70,
            typeProperty: 'created_at',
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
                return cell.value == 1 ? t('dashboard:one_coin') : `${cell.value} ${t('dashboard:coins')}`;
            },
            disableFilters: true,
            disableSortBy: true,
            showSort: true,
        },
        {
            Header: t('dashboard:info') as string,
            accessor: 'info',
            typeProperty: 'action_type',
            Cell: ({ cell }: any) => {
                const val = cell.row.original?.uniqNumber;

                return `${t(`dashboard:wallet_info.${cell.value.toLowerCase()}`)}${val ? ` (${val})` : ''}`;
            },
            disableFilters: true,
            disableSortBy: true,
            showSort: true,
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
            {sortBy} {sortType}
            <FilterCalendar
                setFullDate={setFullDate}
                fullDate={fullDate}
                setMonth={setMonth}
                month={month}
                setFiltringByDate={setFiltringByDate}
            />
            {activeData?.data && (
                <Table handleSort={handleSortProducts} enableSort data={activeData?.data} columns={cols} isSecondType />
            )}
            {activeData?.totalPages > 1 && <Pagination pageCount={activeData?.totalPages} />}
        </div>
    );
};
