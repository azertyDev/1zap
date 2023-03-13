import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Table } from 'components/ui/dashboard/table2';
import { useStore } from 'src/store/useStore';
import { shallow } from 'zustand/shallow';
import { Button } from 'src/components/ui/button';
import { Icon } from 'src/components/ui/icon';
import { ColumnFilter } from 'components/ui/dashboard/table2/columnFilter';

import s from './index.module.scss';

export const Products = () => {
    const {
        applications,
        providers,
        loading,
        error,
        fetchApplications,
        fetchProviders,
        fetchBranchById,
        fetchProviderBranches,
        fetchProviderById,
    } = useStore((state) => state, shallow);

    useEffect(() => {
        fetchApplications();
        fetchProviders();
        // fetchProviderById(1);
        // fetchProviderBranches();
        // fetchBranchById(1);
    }, [
        fetchApplications,
        fetchProviders,
        // fetchProviderById,
        // fetchProviderBranches,
        // fetchBranchById
    ]);

    const getId = (id: number) => console.log(id);

    const applicationCols = [
        {
            Header: '',
            accessor: 'providerName',
            disableSortBy: true,
            Filter: ColumnFilter,
        },
        {
            Header: 'Организация',
            accessor: 'providerSurname',
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
                    <div className={s.actionButtons}>
                        <button onClick={() => getId(cell.id)}>Добавить</button>
                        <span>
                            <Icon name="more_horiz" size={20} />
                        </span>
                    </div>
                );
            },
        },
    ];

    const providerCols = [
        {
            Header: '',
            accessor: 'providerName',
            disableSortBy: true,
        },
        {
            Header: 'Организация',
            accessor: 'providerSurname',
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
                    <div className={s.actionButtons}>
                        <Button variant="primary">Добавить</Button>
                        <span>
                            <Icon name="more_horiz" size={20} />
                        </span>
                    </div>
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

    return (
        <div>
            <Table
                columns={applicationCols}
                data={applications?.data}
                title={<h4 className={s.title}>Новые заявки</h4>}
            />
            <Table
                columns={providerCols}
                data={applications?.data}
                title={<h4 className={s.title}>Все поставщики</h4>}
            />
        </div>
    );
};
