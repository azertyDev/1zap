import dayjs from 'dayjs';
import Link from 'next/link';
import { Column } from 'react-table';
import { FC, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { shallow } from 'zustand/shallow';
import { useStore } from 'src/store/useStore';
import { MenuItem } from '@szhsin/react-menu';
import { applicationApi, providerApi } from 'src/utils/api';
import { Table } from 'src/components/ui/dashboard/table';
import { ColumnFilter } from 'src/components/ui/dashboard/table/columnFilter';
import { ActionsBlock } from 'src/components/ui/dashboard/table/ActionsBlock';
import { StatisticsBlock } from 'src/components/ui/dashboard/statistics_block';
import { Icon } from 'src/components/ui/icon';
import s from './index.module.scss';
import { useRouter } from 'next/router';
import { Pagination } from 'components/ui/pagination/Pagination';
import { useSortDataAdminProvider } from 'src/hooks/common/useSortDataAdminProvider';

export const Providers: FC = (props): JSX.Element => {
    const { t } = useTranslation();
    const {
        query: { page, pageSec },
    } = useRouter();
    const { applications, providers, fetchProviders, fetchApplications } = useStore((state) => state, shallow);
    const [statistic, setStatistic] = useState({
        numberOfApp: 0,
        numberOfProviders: 0,
    });
    const [searchValProviders, setSearchValProviders] = useState('');
    const [searchValApplications, setSearchValApplications] = useState('');

    const { sortBy, sortType, handleSortProducts } = useSortDataAdminProvider();
    const {
        sortBy: sortByProvider,
        sortType: sortTypeProvider,
        handleSortProducts: handleSortProductsProvider,
    } = useSortDataAdminProvider();

    useEffect(() => {
        applicationApi.getApplicationStatistic().then((res) => setStatistic(res));
    }, []);

    useEffect(() => {
        fetchApplications('active', page as string, searchValApplications, sortBy);
    }, [page, searchValApplications, sortBy]);

    useEffect(() => {
        fetchProviders(pageSec as string, searchValProviders, sortByProvider);
    }, [pageSec, searchValProviders, sortByProvider]);

    const deleteApp = useCallback((id: number) => {
        return () => {
            applicationApi.delete(id).then(() => {
                fetchApplications();
                toast.success(t('helpers:deleted'));
            });
        };
    }, []);

    const deleteAppCurrent = useCallback((id: number) => {
        return () => {
            providerApi.deleteCurrentProvider(id).then(() => {
                fetchProviders(pageSec as string, '');
                toast.success(t('helpers:deleted'));
            });
        };
    }, []);

    const menuContent = (data: any) => (
        <MenuItem onClick={deleteApp(data.id)}>
            <Icon name="delete" color="black" />
            {t('dashboard:delete')}
        </MenuItem>
    );

    const menuContentCurrent = (data: any) => (
        <MenuItem onClick={deleteAppCurrent(data.id)}>
            <Icon name="delete" color="black" />
            {t('dashboard:delete')}
        </MenuItem>
    );

    const applicationCols = [
        {
            Header: '',
            accessor: 'providerName',
            disableSortBy: true,
            minWidth: 200,
            Filter: <ColumnFilter setSearch={setSearchValApplications} />,
        },
        {
            Header: t('dashboard:organization') as string,
            accessor: 'companyName',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: t('dashboard:phone') as string,
            accessor: 'phone',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'ID',
            accessor: 'id',
            disableSortBy: true,
            disableFilters: true,
            maxWidth: 80,
        },
        {
            Header: t('dashboard:date') as string,
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YY'),
            disableFilters: true,
            disableSortBy: true,
            showSort: true,
            maxWidth: 80,
        },
        {
            Header: t('dashboard:action') as string,
            disableFilters: true,
            disableSortBy: true,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock cell={cell} menu={menuContent(cell)}>
                        <Link
                            href={{
                                pathname: '/dashboard/[slug]/[params]',
                                query: { id: cell.id, slug: 'providers', params: 'create' },
                            }}
                        >
                            {t('dashboard:add')}
                        </Link>
                    </ActionsBlock>
                );
            },
        },
    ];

    const providerCols = [
        {
            Header: '',
            accessor: 'fullName',
            disableSortBy: true,
            minWidth: 200,
            Filter: <ColumnFilter setSearch={setSearchValProviders} />,
        },
        {
            Header: t('dashboard:organization') as string,
            accessor: 'companyName',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: t('dashboard:phone') as string,
            accessor: 'phone',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'ID',
            accessor: 'id',
            disableSortBy: true,
            disableFilters: true,
            maxWidth: 80,
            minWidth: 80,
        },
        {
            Header: t('dashboard:date') as string,
            accessor: 'createdAt',
            disableFilters: true,
            disableSortBy: true,
            showSort: true,
            typeProperty: 'date',
            maxWidth: 90,
            minWidth: 90,
        },
        {
            Header: t('dashboard:action') as string,
            disableFilters: true,
            disableSortBy: true,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock cell={cell} menu={menuContentCurrent(cell)}>
                        <Link href={`/dashboard/providers/profile?id=${cell.id}`}>{t('dashboard:change')}</Link>
                    </ActionsBlock>
                );
            },
        },
    ];

    const data = [
        {
            id: 1,
            title: t('dashboard:new_requests'),
            date: t('dashboard:have_to_check'),
            count: statistic.numberOfApp,
        },
        {
            id: 2,
            title: t('dashboard:count_of_providers'),
            date: t('dashboard:all_period'),
            count: statistic.numberOfProviders,
        },
    ];

    return (
        <div>
            <StatisticsBlock data={data} title={<h4>{t('dashboard:current_res')}</h4>} />
            {applications?.data && (
                <Table
                    handleSort={handleSortProducts}
                    enableSort
                    columns={applicationCols}
                    data={applications?.data}
                    title={<h4 className={s.title}>{t('dashboard:new_requests')}</h4>}
                />
            )}

            {applications?.totalPages > 1 && <Pagination pageCount={applications.totalPages} />}

            <div className={s.divider}></div>
            {providers?.data && (
                <Table
                    handleSort={handleSortProductsProvider}
                    enableSort
                    columns={providerCols}
                    data={providers?.data}
                    title={<h4 className={s.title}>{t('dashboard:all_providers')}</h4>}
                />
            )}

            {providers?.totalPages > 1 && <Pagination pageCount={providers.totalPages} isSecPage />}
        </div>
    );
};
