import dayjs from 'dayjs';
import Link from 'next/link';
import { Column } from 'react-table';
import { FC, useEffect } from 'react';
import { Table } from 'src/components/ui/dashboard/table';
import { useStore } from 'src/store/useStore';
import { shallow } from 'zustand/shallow';
import { ColumnFilter } from 'src/components/ui/dashboard/table/columnFilter';
import { ActionsBlock } from 'src/components/ui/dashboard/table/ActionsBlock';
import { StatisticsBlock } from 'src/components/ui/dashboard/statistics_block';
import s from './index.module.scss';

export const Providers: FC = (): JSX.Element => {
    const { applications, providers, loading, error, fetchApplications, fetchProviders } = useStore(
        (state) => state,
        shallow
    );

    useEffect(() => {
        fetchApplications();
        fetchProviders();
    }, [fetchApplications, fetchProviders]);

    const applicationCols = [
        {
            Header: '',
            accessor: 'providerName',
            disableSortBy: true,
            Filter: ColumnFilter,
        },
        {
            Header: 'Организация',
            accessor: 'companyName',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'Контактный телефон',
            accessor: 'phone',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'ID',
            accessor: 'id',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'Дата',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YYYY'),
            disableFilters: true,
        },
        {
            Header: 'Действия',
            disableFilters: true,
            disableSortBy: true,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock cell={cell}>
                        <Link
                            href={{
                                pathname: '/dashboard/[slug]/[params]',
                                query: { id: cell.id, slug: 'providers', params: 'create' },
                            }}
                        >
                            Добавить
                        </Link>
                    </ActionsBlock>
                );
            },
        },
    ];

    const providerCols: Column<any>[] = [
        {
            Header: '',
            accessor: 'fullName',
            disableSortBy: true,
            // Cell: (props): any => {
            //     const {
            //         original: { providerName, providerSurname },
            //     } = props.cell.row;

            //     return `${providerName} ${providerSurname}`;
            // },
        },
        {
            Header: 'Организация',
            accessor: 'companyName',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'Контактный телефон',
            accessor: 'phone',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'ID',
            accessor: 'id',
            disableSortBy: true,
            disableFilters: true,
            width: 90,
            maxWidth: 100,
            minWidth: 80,
        },
        {
            Header: 'Дата',
            accessor: 'createdAt',
            // Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YYYY') as any,
            disableFilters: true,
        },
        {
            Header: 'Действия',
            disableFilters: true,
            disableSortBy: true,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock cell={cell}>
                        <Link
                            href={{
                                pathname: '#',
                            }}
                        >
                            Добавить
                        </Link>
                    </ActionsBlock>
                );
            },
        },
    ];

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (loading) {
        return <div>Loading....</div>;
    }

    const data = [
        {
            id: 1,
            title: 'Новые заявки',
            date: 'Необходима обработка',
            count: applications?.data.length!,
        },
        {
            id: 2,
            title: 'Всего поставщиков',
            date: 'За весь период',
            count: providers?.data.length!,
        },
    ];

    return (
        <div>
            <StatisticsBlock data={data} title={<h4>Текущие показатели</h4>} />

            {applications?.data.length !== 0 && (
                <Table
                    columns={applicationCols}
                    data={applications?.data}
                    title={<h4 className={s.title}>Новые заявки</h4>}
                />
            )}
            {providers?.data.length > 0 && (
                <Table
                    columns={providerCols}
                    data={providers?.data}
                    title={<h4 className={s.title}>Все поставщики</h4>}
                />
            )}
        </div>
    );
};
