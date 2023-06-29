import Link from 'next/link';
import dayjs from 'dayjs';
import { Column } from 'react-table';
import React, { useEffect, useState } from 'react';
import { StatisticsBlock } from 'src/components/ui/dashboard/statistics_block';
import { Table } from 'src/components/ui/dashboard/table';
import { ActionsBlock } from 'src/components/ui/dashboard/table/ActionsBlock';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import s from '../index.module.scss';
import { IProviderStat } from 'types';
import { Pagination } from 'components/ui/pagination/Pagination';
import { toast } from 'react-hot-toast';
import { priceListApi, providerApi } from 'src/utils/api';
import { Heading } from 'components/ui/dashboard/heading';

export const ViewPriceLists = () => {
    const { t } = useTranslation();
    const [priceLists, setPriceLists] = useState<any>(null);
    const [dataStat, setDataStat] = useState<IProviderStat | null>(null);
    const {
        query: { page, id },
    } = useRouter();

    useEffect(() => {
        priceListApi
            .getPriceListByProviderId(id as string, page as string)
            .then((res) => setPriceLists(res))
            .catch(() => toast.error(''));

        providerApi
            .getProviderStatisticByAdmin(id as string)
            .then((res) => setDataStat(res))
            .catch(() => toast.error(''));
    }, []);

    const priceListCols: Column<any>[] = [
        {
            Header: t('dashboard:price_list_name') as string,
            accessor: 'title',
            disableSortBy: true,
            disableFilters: true,
            width: 200,
        },
        {
            Header: t('dashboard:price_list_type') as string,
            accessor: 'type',
            // @ts-ignore
            Cell: ({ cell }) => {
                switch (cell.value) {
                    case 'part':
                        return t('common:partSelection');
                    case 'tire':
                        return t('common:tires');
                    case 'oil':
                        return t('common:oil');
                    case 'battery':
                        return t('common:batteries');
                }
            },
            disableSortBy: true,
            disableFilters: true,
            width: 120,
        },
        {
            Header: t('dashboard:branch') as string,
            accessor: 'branchName',
            disableFilters: true,
            disableSortBy: true,
        },
        {
            Header: 'ID',
            accessor: 'id',
            disableSortBy: true,
            disableFilters: true,
            width: 50,
        },
        {
            Header: t('dashboard:date') as string,
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YY') as any,
            disableFilters: true,
        },
        {
            Header: t('dashboard:action') as string,
            disableFilters: true,
            disableSortBy: true,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <Link href={`/dashboard/providers/price_list?id=${cell.id}&page=1`}>{t('common:open')}</Link>
                    </ActionsBlock>
                );
            },
        },
    ];

    const statisticsData = [
        {
            id: 1,
            title: t('dashboard:position'),
            date: t('dashboard:refresh_day', { day: dataStat?.products?.date }),
            count: dataStat?.products?.total,
        },
        {
            id: 2,
            title: t('dashboard:transitions'),
            date: t('dashboard:this_month'),
            count: dataStat?.transitions?.total,
        },
    ];

    return (
        <div className={s.wrapper}>
            <Heading title={t(`dashboard:products`)} desc={''} />
            <StatisticsBlock data={statisticsData as any} title={<h4>{t('dashboard:current_res')}</h4>} />

            {priceLists?.data?.length > 0 && <Table columns={priceListCols} data={priceLists?.data} />}
            {priceLists?.totalPages > 1 && <Pagination pageCount={priceLists?.totalPages} />}
        </div>
    );
};
