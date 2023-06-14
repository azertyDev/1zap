import { MenuItem } from '@szhsin/react-menu';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Column } from 'react-table';
import { useEffect, useState } from 'react';
import { useStore } from 'src/store/useStore';
import { Icon } from 'src/components/ui/icon';
import { Button } from 'src/components/ui/button';
import { Table } from 'src/components/ui/dashboard/table';
import { Heading } from 'src/components/ui/dashboard/heading';
import { ActionsBlock } from 'src/components/ui/dashboard/table/ActionsBlock';
import { BaseSwitch } from 'src/components/ui/switch/BaseSwitch';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export const Branches = (props: any) => {
    const { pageProps } = props;
    const { providerBranches, fetchProviderBranches } = useStore();
    const { push, ...rest } = useRouter();

    const { t } = useTranslation();

    useEffect(() => {
        fetchProviderBranches();
    }, [fetchProviderBranches]);

    const updateBranch = (id: number) => {
        push({
            pathname: '/cabinet/main/editBranch',
            query: { id: id },
        });
    };

    const columnMenu = (data: any) => (
        <>
            <MenuItem onClick={() => updateBranch(data.id)}>
                <Icon name="edit" color="black" />
                {t('dashboard:edit')}
            </MenuItem>
            <MenuItem>
                <Icon name="delete" color="black" />
                {t('dashboard:delete')}
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
            accessor: 'type',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: t('dashboard:positions') as string,
            // accessor: 'branchName',
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
                        <BaseSwitch
                        // checked={active}
                        // onChange={handleChange}
                        />
                    </ActionsBlock>
                );
            },
        },
    ];

    return (
        <>
            <Heading title={t(`dashboard:${pageProps.title}`)} desc={t(`dashboard:branch_info_setting`)} />

            {!!providerBranches && <Table columns={branchesCols} data={providerBranches} />}
        </>
    );
};
