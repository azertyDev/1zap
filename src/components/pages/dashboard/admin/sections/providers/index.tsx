import dayjs from 'dayjs';
import Link from 'next/link';
import { Column } from 'react-table';
import { FC, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { shallow } from 'zustand/shallow';
import { useStore } from 'src/store/useStore';
import { MenuItem } from '@szhsin/react-menu';
import { applicationApi } from 'src/utils/api';
import { Table } from 'src/components/ui/dashboard/table';
import { ColumnFilter } from 'src/components/ui/dashboard/table/columnFilter';
import { ActionsBlock } from 'src/components/ui/dashboard/table/ActionsBlock';
import { StatisticsBlock } from 'src/components/ui/dashboard/statistics_block';
import { Icon } from 'src/components/ui/icon';
import s from './index.module.scss';
import { useRouter } from 'next/router';
import { Pagination } from 'components/ui/pagination/Pagination';

export const Providers: FC = (props): JSX.Element => {
    const { t } = useTranslation();
    const {
        query: { page, pageSec },
    } = useRouter();
    const { applications, providers, fetchProviders, fetchApplications } = useStore((state) => state, shallow);

    useEffect(() => {
        fetchApplications('active', page as string);
    }, [page]);

    useEffect(() => {
        fetchProviders(pageSec as string);
    }, [pageSec]);

    const deleteApp = (id: number) => {
        applicationApi.delete(id).then(() => {
            fetchApplications();
            toast.success(t('helpers:deleted'));
        });
    };

    const menuContent = (data: any) => (
        <>
            <MenuItem onClick={() => deleteApp(data.id)}>
                <Icon name="delete" color="black" />
                {t('dashboard:delete')}
            </MenuItem>
        </>
    );

    console.log(providers);

    const applicationCols = [
        {
            Header: '',
            accessor: 'providerName',
            disableSortBy: true,
            minWidth: 200,
            Filter: ColumnFilter,
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

    const providerCols: Column<any>[] = [
        {
            Header: '',
            accessor: 'fullName',
            disableSortBy: true,
            minWidth: 200,
            Filter: ColumnFilter,
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
            maxWidth: 90,
            minWidth: 90,
        },
        // {
        //     Header: t('dashboard:action') as string,
        //     disableFilters: true,
        //     disableSortBy: true,
        //     accessor: (cell: any) => {
        //         return (
        //             <ActionsBlock>
        //                 <Link
        //                     href={{
        //                         pathname: '/dashboard/[slug]/[params]',
        //                         query: { id: cell.id, slug: 'providers', params: 'create' },
        //                     }}
        //                 >
        //                     {t('dashboard:change')}
        //                 </Link>
        //             </ActionsBlock>
        //         );
        //     },
        // },
    ];

    const data = [
        {
            id: 1,
            title: t('dashboard:new_requests'),
            date: t('dashboard:have_to_check'),
            count: applications?.data.length!,
        },
        {
            id: 2,
            title: t('dashboard:count_of_providers'),
            date: t('dashboard:all_period'),
            count: providers?.data.length!,
        },
    ];

    return (
        <div>
            <StatisticsBlock data={data} title={<h4>{t('dashboard:current_res')}</h4>} />

            {applications?.data && (
                <Table
                    columns={applicationCols}
                    data={applications?.data}
                    title={<h4 className={s.title}>{t('dashboard:new_requests')}</h4>}
                />
            )}

            {applications?.totalPages > 1 && <Pagination pageCount={applications.totalPages} />}

            <div className={s.divider}></div>
            {providers?.data.length > 0 && (
                <Table
                    columns={providerCols}
                    data={providers?.data}
                    title={<h4 className={s.title}>{t('dashboard:all_providers')}</h4>}
                />
            )}

            {providers?.totalPages > 1 && <Pagination pageCount={providers.totalPages} isSecPage />}
        </div>
    );
};
