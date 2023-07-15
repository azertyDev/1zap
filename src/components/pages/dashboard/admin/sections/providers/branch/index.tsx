import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Heading } from 'components/ui/dashboard/heading';
import { Column } from 'react-table';
import dayjs from 'dayjs';
import { ActionsBlock } from 'components/ui/dashboard/table/ActionsBlock';
import Link from 'next/link';
import { BaseSwitch } from 'components/ui/switch/BaseSwitch';
import { useEffect, useState } from 'react';
import { branchApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { Table } from 'components/ui/dashboard/table';
import { Button } from 'src/components/ui/button';
import { Icon } from 'src/components/ui/icon';

export const BranchesEditProvider = () => {
    const { t } = useTranslation();
    const [data, setData] = useState(null);

    const {
        query: { id },
        push,
    } = useRouter();

    useEffect(() => {
        branchApi
            .getProviderBranchesByid(id as string)
            .then((res) => setData(res))
            .catch(() => toast.error(t('helpers:error_getting')));
    }, []);

    const branchesCols: Column<any>[] = [
        {
            Header: t('dashboard:date') as string,
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YY') as any,
            disableFilters: true,
        },
        {
            Header: t('dashboard:called') as string,
            accessor: 'branchName',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: t('dashboard:price-list') as string,
            accessor: 'pricelist',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: t('dashboard:positions') as string,
            accessor: 'products',
            disableFilters: true,
            disableSortBy: true,
        },
        {
            Header: t('dashboard:action') as string,
            disableFilters: true,
            disableSortBy: true,
            maxWidth: 150,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <Link href={`/dashboard/providers/edit_branch?id=${cell.id}`}>{t('dashboard:change')}</Link>
                    </ActionsBlock>
                );
            },
        },
        {
            Header: t('dashboard:switch_on') as string,
            disableFilters: true,
            disableSortBy: true,
            maxWidth: 80,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <BaseSwitch readOnly checked={cell.isActive} />
                    </ActionsBlock>
                );
            },
        },
    ];

    return (
        <div>
            <Heading title={t(`dashboard:branches`)} desc={''} />

            {data && <Table columns={branchesCols} data={data} />}
        </div>
    );
};
