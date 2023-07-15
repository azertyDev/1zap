import { MenuItem } from '@szhsin/react-menu';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Column } from 'react-table';
import { useCallback, useEffect } from 'react';
import { useStore } from 'src/store/useStore';
import { Icon } from 'src/components/ui/icon';
import { Table } from 'src/components/ui/dashboard/table';
import { Heading } from 'src/components/ui/dashboard/heading';
import { ActionsBlock } from 'src/components/ui/dashboard/table/ActionsBlock';
import { BaseSwitch } from 'src/components/ui/switch/BaseSwitch';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { providerApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { Button } from 'src/components/ui/button';

export const Branches = (props: any) => {
    const { pageProps } = props;
    const { providerBranches, fetchProviderBranches } = useStore();
    const { push, ...rest } = useRouter();

    const { t } = useTranslation();

    useEffect(() => {
        fetchProviderBranches();
    }, [fetchProviderBranches]);

    const updateBranch = useCallback((id: number) => {
        push({
            pathname: '/cabinet/main/editBranch',
            query: { id: id },
        });
    }, []);

    const handleActiviteBranch = useCallback((id: number) => {
        return () => {
            providerApi
                .activateOrdisactivateBranch(id)
                .then(() => fetchProviderBranches())
                .catch(() => toast.error(t('helpers:error_sending')));
        };
    }, []);

    const columnMenu = (data: any) => (
        <>
            <MenuItem onClick={() => updateBranch(data.id)}>
                <Icon name="edit" color="black" />
                {t('dashboard:edit')}
            </MenuItem>
        </>
    );

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
            Header: t('dashboard:promo_noun') as string,
            disableSortBy: true,
            disableFilters: true,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <Link
                            href={{
                                pathname: '/cabinet/promo/all_branches',
                            }}
                        >
                            {t('dashboard:add')}
                        </Link>
                    </ActionsBlock>
                );
            },
        },
        {
            Header: t('dashboard:switch_on') as string,
            disableFilters: true,
            disableSortBy: true,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock cell={cell} menu={columnMenu(cell)}>
                        <BaseSwitch checked={cell.isActive} onChange={handleActiviteBranch(cell.id)} />
                    </ActionsBlock>
                );
            },
        },
    ];

    return (
        <>
            <Heading title={t(`dashboard:${pageProps.title}`)} desc={t(`dashboard:branch_info_setting`)} />

            <Button variant="primary" style={{ marginBottom: 25 }} onClick={() => push(`/cabinet/main/createBranch`)}>
                <Icon name="storefront" color="#fff" />
                {t('dashboard:add_new_branch')}
            </Button>

            {!!providerBranches && <Table columns={branchesCols} data={providerBranches} />}
        </>
    );
};
