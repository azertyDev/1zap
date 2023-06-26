import s from '../index.module.scss';
import { useTranslation } from 'next-i18next';
import { useStore } from 'src/store/useStore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { priceListApi, productsApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { formatNumber } from 'src/helpers/formatNumber';
import { ActionsBlock } from 'components/ui/dashboard/table/ActionsBlock';
import { Button } from 'components/ui/button';
import { StatisticsBlock } from 'components/ui/dashboard/statistics_block';
import { Table } from 'components/ui/dashboard/table';
import { Pagination } from 'components/ui/pagination/Pagination';

export const ViewPriceList = () => {
    const { currency } = useStore((state) => state);
    const { t } = useTranslation();

    const {
        query: { id, page },
        locale,
    } = useRouter();

    const [dataStat, setDataStat] = useState<any>(null);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        (() => {
            priceListApi
                .getProductsByPriceListId(id as string, locale as string, page as string)
                .then((res) => setData(res))
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, [page]);

    useEffect(() => {
        (() => {
            productsApi
                .getListInfo(id as any)
                .then((res) => setDataStat(res))
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, []);

    const statisticsData = [
        {
            id: 1,
            title: t('dashboard:position'),
            date: t('dashboard:refresh_day', { day: dataStat?.updatedAt }),
            count: dataStat?.total,
        },
    ];
    const cols = [
        {
            Header: t('common:selects.number'),
            accessor: 'uniqNumber',
            disableFilters: true,
            maxWidth: 90,
        },
        {
            Header: t('common:selects.manufacturers'),
            accessor: 'manufacturer',
            disableFilters: true,
        },
        {
            Header: t('common:selects.howmany'),
            accessor: 'availability',
            disableFilters: true,
            Cell: ({ cell }: { cell: any }) => `${cell.value} ${t('common:howmany')}`,
            maxWidth: 90,
        },
        {
            Header: t('common:selects.price'),
            accessor: currency === 'uzs' ? 'sum' : 'usd',
            Cell: ({ cell }: { cell: any }) => {
                return currency === 'usd'
                    ? `$${formatNumber(cell.value)}`
                    : `${formatNumber(cell.value)} ${t('common:sum')}`;
            },
            disableFilters: true,
        },
        {
            Header: t('dashboard:addv') as string,
            disableFilters: true,
            disableSortBy: true,
            width: 100,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <div className={`${s.table_btn} ${cell.hasAdvertising ? s.active : ''}`}>
                            <Button variant={'primary'} type={'button'}>
                                {cell.hasAdvertising ? t('dashboard:have') : t('dashboard:dont_have')}
                            </Button>
                        </div>
                    </ActionsBlock>
                );
            },
        },
    ];

    return (
        <div>
            <StatisticsBlock data={statisticsData as any} title={<h4>{t('dashboard:price_list_info')}</h4>} />

            {data?.data && <Table data={data.data} columns={cols} />}
            {data?.totalPages > 1 && <Pagination pageCount={data.totalPages} />}
        </div>
    );
};
